'use client';

import { useState, useMemo } from 'react';
import Map, { Marker, Popup, NavigationControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { type Hotel } from '@/lib/mock-data';
import clsx from 'clsx';

interface MapComponentProps {
    hotels: Hotel[];
    highlightedHotelId?: string | null;
}

export default function MapComponent({ hotels, highlightedHotelId }: MapComponentProps) {
    // Center map on first hotel or default location
    const initialViewState = {
        longitude: hotels[0]?.coordinates.lng || -73.9855,
        latitude: hotels[0]?.coordinates.lat || 40.7580,
        zoom: 12
    };

    const [popupInfo, setPopupInfo] = useState<Hotel | null>(null);

    // If highlightedHotelId changes, we could flyTo it, but for now we'll just highlight the marker

    return (
        <div className="h-full w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm relative">
            <Map
                initialViewState={initialViewState}
                style={{ width: '100%', height: '100%' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
            >
                <NavigationControl position="top-left" />

                {hotels.map((hotel) => (
                    <Marker
                        key={hotel.id}
                        longitude={hotel.coordinates.lng}
                        latitude={hotel.coordinates.lat}
                        anchor="bottom"
                        onClick={(e) => {
                            e.originalEvent.stopPropagation();
                            setPopupInfo(hotel);
                        }}
                    >
                        <div
                            className={clsx(
                                "flex cursor-pointer flex-col items-center transition-all duration-300",
                                (highlightedHotelId === hotel.id) ? "scale-125 z-10" : "scale-100 z-0"
                            )}
                        >
                            <div className={clsx(
                                "whitespace-nowrap rounded-lg px-2 py-1 text-sm font-bold shadow-md",
                                (highlightedHotelId === hotel.id)
                                    ? "bg-red-600 text-white animate-bounce"
                                    : "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50"
                            )}>
                                ${hotel.price}
                            </div>
                            <div className={clsx(
                                "h-0 w-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent",
                                (highlightedHotelId === hotel.id) ? "border-t-red-600" : "border-t-white"
                            )} />
                        </div>
                    </Marker>
                ))}

                {popupInfo && (
                    <Popup
                        anchor="top"
                        longitude={popupInfo.coordinates.lng}
                        latitude={popupInfo.coordinates.lat}
                        onClose={() => setPopupInfo(null)}
                        closeOnClick={false}
                    >
                        <div className="p-1">
                            <h3 className="font-bold">{popupInfo.name}</h3>
                            <p className="text-sm text-gray-500">{popupInfo.location}</p>
                        </div>
                    </Popup>
                )}
            </Map>

            {/* Token Warning (Dev only) */}
            {!process.env.NEXT_PUBLIC_MAPBOX_TOKEN && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 z-50 p-4 text-center">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
                        <h3 className="font-bold text-red-600 text-lg mb-2">Missing Mapbox Token</h3>
                        <p className="text-sm text-gray-600">
                            Please add valid <code>NEXT_PUBLIC_MAPBOX_TOKEN</code> to your <code>.env.local</code> file to view the map.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
