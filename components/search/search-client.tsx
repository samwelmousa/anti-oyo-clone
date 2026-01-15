'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import SearchFilter from '@/components/shared/SearchFilter';
import HotelCard from '@/components/hotel/HotelCard';
import { useStore } from '@/hooks/use-store';

const MapComponent = dynamic(() => import('@/components/hotel/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full rounded-xl bg-gray-100 animate-pulse" />
});

interface SearchClientProps {
    initialHotels: any[];
}

export default function SearchClient({ initialHotels }: SearchClientProps) {
    const { hotels, setHotels } = useStore();
    const [hoveredHotelId, setHoveredHotelId] = useState<string | null>(null);

    // Hydrate the store with initial data from the server
    useEffect(() => {
        setHotels(initialHotels);
    }, [initialHotels, setHotels]);

    // Use store data for rendering
    const displayHotels = hotels.length > 0 ? hotels : initialHotels;

    return (
        <div className="flex min-h-screen flex-col">
            <SearchFilter />

            <main className="container mx-auto flex flex-1 gap-6 p-6">
                {/* Left Column: Hotel List (60%) */}
                <div className="w-full lg:w-[60%] flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {displayHotels.length} hotels found in New York
                        </h1>
                        <select className="rounded-md border-gray-300 py-1 text-sm focus:border-red-500 focus:ring-red-500 dark:bg-slate-800 dark:border-slate-700">
                            <option>Recommended</option>
                            <option>Price: Low to High</option>
                            <option>Rating: High to Low</option>
                        </select>
                    </div>

                    {displayHotels.length === 0 ? (
                        <div className="flex h-64 flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 dark:bg-slate-900 dark:border-slate-800 text-center">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No hotels found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                            {displayHotels.map((hotel) => (
                                <HotelCard
                                    key={hotel.id}
                                    hotel={hotel}
                                    onMouseEnter={() => setHoveredHotelId(hotel.id)}
                                    onMouseLeave={() => setHoveredHotelId(null)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column: Map (40%) - Sticky */}
                <div className="hidden lg:block lg:w-[40%]">
                    <div className="sticky top-32 h-[calc(100vh-9rem)] w-full">
                        <MapComponent
                            hotels={displayHotels}
                            highlightedHotelId={hoveredHotelId}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}
