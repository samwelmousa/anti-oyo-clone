import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import BookingWidget from '@/components/hotel/BookingWidget';
import { MapPin, Star, Wifi, Car, Coffee, Utensils } from 'lucide-react';

// This is a Server Component
export const dynamic = "force-dynamic";

export default async function HotelPage({ params }: { params: { slug: string } }) {
    const slug = params.slug;

    // Fetch hotel and include rooms to get the price
    const hotel = await prisma.hotel.findFirst({
        where: {
            rooms: {
                some: { slug: slug } // In our seed, room slug matches hotel slug logic for simplicity
            }
        },
        include: {
            rooms: true
        }
    });

    // If not found by room slug, try finding hotel by ID or just use mock fallback in real app.
    // But wait, our seed uses the ROOM slug as the main identifier for the page in this context?
    // Let's assume /hotels/[slug] refers to the ROOM/Hotel entity.
    // Actually, standard practice: /hotels/[hotel-slug]. 
    // Let's fetch the room by slug directly, assuming one room type per page for this clone.

    const room = await prisma.room.findUnique({
        where: { slug },
        include: { hotel: true }
    });

    if (!room) {
        return notFound();
    }

    const hotelData = room.hotel;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Image Gallery Header */}
            <div className="relative h-[50vh] w-full bg-gray-900">
                <Image
                    src={hotelData.images[0] || ''}
                    alt={hotelData.name}
                    fill
                    className="object-cover opacity-90"
                    priority
                />
                <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-black/80 to-transparent" />
                <div className="container mx-auto relative h-full flex items-end pb-8 px-4">
                    <div className="text-white">
                        <h1 className="text-4xl font-bold mb-2">{hotelData.name}</h1>
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <span className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" /> {hotelData.address}
                            </span>
                            <span className="flex items-center gap-1 bg-green-600 px-2 py-0.5 rounded">
                                4.5 <Star className="h-3 w-3 fill-current" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 -mt-8 relative z-10">
                {/* Left Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* About */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">About this hotel</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {hotelData.description}
                        </p>
                    </div>

                    {/* Amenities */}
                    <div className="rounded-xl border bg-white p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4">Amenities</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {room.amenities.length > 0 ? (
                                room.amenities.map((amenity) => (
                                    <div key={amenity} className="flex items-center gap-2 text-gray-600 capitalize">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                                        {amenity}
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Wifi className="h-5 w-5" /> Free Wifi
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Car className="h-5 w-5" /> Parking Facility
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar - Sticky Booking Widget */}
                <div className="relative">
                    <BookingWidget price={Number(room.price)} roomId={room.id} />
                </div>
            </main>
        </div>
    );
}
