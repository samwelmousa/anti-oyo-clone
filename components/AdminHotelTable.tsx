"use client";

import { useOptimistic, useTransition, useState } from "react";
import { toggleVerification } from "@/lib/actions/hotel-actions";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { clsx } from "clsx";

type HotelWithOwner = {
    id: string;
    name: string;
    isVerified: boolean;
    owner?: { email: string | null } | null;
    address: string;
};

export default function AdminHotelTable({ initialHotels }: { initialHotels: any[] }) {
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const [optimisticHotels, addOptimisticHotel] = useOptimistic(
        initialHotels,
        (state, { hotelId, isVerified }) =>
            state.map((h) => (h.id === hotelId ? { ...h, isVerified } : h))
    );

    const handleToggle = async (hotelId: string, currentStatus: boolean) => {
        setLoadingId(hotelId);
        startTransition(async () => {
            addOptimisticHotel({ hotelId, isVerified: !currentStatus });
            try {
                await toggleVerification(hotelId);
            } catch (error) {
                console.error("Failed to toggle verification:", error);
            } finally {
                setLoadingId(null);
            }
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-medium text-sm">
                    <tr>
                        <th className="px-6 py-4">Hotel Name</th>
                        <th className="px-6 py-4">Owner Email</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {optimisticHotels.map((hotel) => (
                        <tr
                            key={hotel.id}
                            className={clsx(
                                "hover:bg-gray-50 transition-colors",
                                !hotel.isVerified && "bg-red-50/30"
                            )}
                        >
                            <td className="px-6 py-4">
                                <div className="font-semibold text-gray-900">{hotel.name}</div>
                                <div className="text-xs text-gray-500">{hotel.address}</div>
                            </td>
                            <td className="px-6 py-4 text-gray-600">
                                {hotel.owner?.email || "Unknown"}
                            </td>
                            <td className="px-6 py-4">
                                <div className={clsx(
                                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
                                    hotel.isVerified ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700 underline decoration-red-200"
                                )}>
                                    {hotel.isVerified ? (
                                        <>
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            Verified
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-3.5 h-3.5" />
                                            Unverified
                                        </>
                                    )}
                                </div>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => handleToggle(hotel.id, hotel.isVerified)}
                                    disabled={loadingId === hotel.id}
                                    className={clsx(
                                        "inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm active:scale-95 disabled:opacity-50",
                                        hotel.isVerified
                                            ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700"
                                    )}
                                >
                                    {loadingId === hotel.id && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                    {hotel.isVerified ? "Revoke Access" : "Verify Hotel"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
