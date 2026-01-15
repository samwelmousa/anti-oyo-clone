import Image from 'next/image';
import { Star, CheckCircle2 } from 'lucide-react';
import type { Hotel } from '@/lib/mock-data';

interface HotelCardProps {
    hotel: Hotel;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

export default function HotelCard({ hotel, onMouseEnter, onMouseLeave }: HotelCardProps) {
    return (
        <div
            className="group flex flex-col overflow-hidden rounded-xl border bg-white transition-shadow hover:shadow-lg cursor-pointer"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={hotel.images[0] || ''}
                    alt={hotel.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {hotel.isVerified && (
                    <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-bold text-green-700 shadow-sm backdrop-blur-sm">
                        <CheckCircle2 className="h-3 w-3 fill-green-700 text-white" />
                        Verified
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-2 p-4">
                <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 line-clamp-2">
                        {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 rounded bg-green-700 px-1.5 py-0.5 text-xs font-bold text-white">
                        {hotel.rating} <Star className="h-2.5 w-2.5 fill-current" />
                    </div>
                </div>

                <p className="text-sm text-gray-500 line-clamp-1">{hotel.location}</p>

                <div className="mt-auto flex items-end justify-between pt-2">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 line-through">${Math.round(hotel.price * 1.4)}</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold text-gray-900">${hotel.price}</span>
                            <span className="text-sm text-gray-500">/ night</span>
                        </div>
                    </div>

                    <button className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 hover:text-gray-900">
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
}
