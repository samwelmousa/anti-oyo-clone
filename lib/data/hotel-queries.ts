import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

/**
 * Optimizes an image URL via Cloudinary transformations if applicable.
 * Saves bandwidth and improves performance by resizing/compressing on the edge.
 */
export function getOptimizedImageUrl(url: string, width = 800) {
    if (!url) return "/placeholder-hotel.jpg";

    // If it's already a Cloudinary URL, we can inject transformation parameters
    if (url.includes("cloudinary.com")) {
        // Simple transformation: auto format, auto quality, fixed width
        return url.replace("/upload/", `/upload/c_scale,w_${width},f_auto,q_auto/`);
    }

    return url;
}

export const getHotels = unstable_cache(
    async () => {
        const hotels = await prisma.hotel.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                rooms: {
                    select: { price: true, slug: true },
                    take: 1
                },
            },
        });

        // Map to UI-compatible format and serialize Decimal
        return hotels.map(hotel => {
            const firstRoom = hotel.rooms[0];
            return {
                id: hotel.id,
                name: hotel.name,
                location: hotel.address,
                price: firstRoom ? Number(firstRoom.price) : 0,
                images: hotel.images.map((img: string) => getOptimizedImageUrl(img)),
                rating: 4.5, // Default rating as Review model isn't aggregated yet
                slug: firstRoom?.slug || hotel.id,
                isVerified: hotel.isVerified,
                createdAt: hotel.createdAt.toISOString(),
                updatedAt: hotel.updatedAt.toISOString(),
                coordinates: {
                    lat: hotel.lat || 40.7128,
                    lng: hotel.lng || -74.0060
                }
            };
        });
    },
    ["hotels-v2"],
    {
        revalidate: 3600, // 1 hour default revalidation
        tags: ["hotels"],
    }
);
