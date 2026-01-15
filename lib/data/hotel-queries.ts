import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const getHotels = unstable_cache(
    async () => {
        return await prisma.hotel.findMany({
            orderBy: { createdAt: "desc" },
            include: {
                rooms: {
                    select: { price: true },
                },
            },
        });
    },
    ["hotels"],
    {
        revalidate: 3600, // 1 hour default revalidation
        tags: ["hotels"],
    }
);
