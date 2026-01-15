'use client';

import { useState } from 'react';
import { differenceInCalendarDays, addDays, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface BookingWidgetProps {
    price: number | any; // Decimal type from Prisma
    roomId: string;
}

export default function BookingWidget({ price, roomId }: BookingWidgetProps) {
    const numericPrice = Number(price);
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Default dates: tomorrow to day after
    const [startDate, setStartDate] = useState<string>(
        format(addDays(new Date(), 1), 'yyyy-MM-dd')
    );
    const [endDate, setEndDate] = useState<string>(
        format(addDays(new Date(), 3), 'yyyy-MM-dd')
    );

    const start = new Date(startDate);
    const end = new Date(endDate);
    const nights = differenceInCalendarDays(end, start);

    const handleBook = async () => {
        if (!session?.user) {
            // Should not happen due to UI structure, but safe check
            router.push('/auth/signin');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    roomId,
                    startDate,
                    endDate
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Booking failed');
            }

            router.push('/bookings/success');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sticky top-20 rounded-xl border bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <span className="text-2xl font-bold text-gray-900">${numericPrice}</span>
                    <span className="text-gray-500"> / night</span>
                </div>
                <div className="rounded bg-red-100 px-2 py-1 text-xs font-bold text-red-600 animate-pulse">
                    Only 2 rooms left!
                </div>
            </div>

            <div className="mb-4 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs font-bold text-gray-700">CHECK-IN</label>
                        <input
                            type="date"
                            className="w-full rounded border p-2 text-sm"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={format(new Date(), 'yyyy-MM-dd')}
                        />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-gray-700">CHECK-OUT</label>
                        <input
                            type="date"
                            className="w-full rounded border p-2 text-sm"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                        />
                    </div>
                </div>
            </div>

            {nights > 0 && (
                <div className="mb-4 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                        <span>${numericPrice.toFixed(2)} x {nights} nights</span>
                        <span>${(nights * numericPrice).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Service Fee (5%)</span>
                        <span>${(nights * numericPrice * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pb-2">
                        <span>Taxes (12%)</span>
                        <span>${(nights * numericPrice * 0.12).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-2">
                        <span>Total</span>
                        <span>${(nights * numericPrice * 1.17).toFixed(2)}</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="mb-4 rounded bg-red-50 p-2 text-sm text-red-600">
                    {error}
                </div>
            )}

            {session?.user ? (
                <button
                    onClick={handleBook}
                    disabled={loading || nights <= 0}
                    className="w-full rounded-lg bg-red-600 py-3 font-bold text-white transition-colors hover:bg-red-700 disabled:bg-gray-300"
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing...
                        </span>
                    ) : (
                        'Book Now'
                    )}
                </button>
            ) : (
                <Link
                    href="/auth/signin"
                    className="block w-full rounded-lg bg-gray-900 py-3 text-center font-bold text-white transition-colors hover:bg-black"
                >
                    Sign in to Book
                </Link>
            )}

            <p className="mt-4 text-center text-xs text-gray-500">
                You won't be charged yet
            </p>
        </div>
    );
}
