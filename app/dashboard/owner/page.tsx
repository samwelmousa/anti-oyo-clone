import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Building2, DollarSign, CalendarCheck, Plus } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const dynamic = "force-dynamic";

export default async function OwnerDashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect("/auth/signin");

    const userId = session.user.id;

    // 1. Fetch statistics
    const [hotelsCount, activeBookingsCount, revenueResult] = await Promise.all([
        prisma.hotel.count({ where: { ownerId: userId } }),
        prisma.booking.count({
            where: {
                room: { hotel: { ownerId: userId } },
                status: "CONFIRMED"
            }
        }),
        prisma.booking.aggregate({
            _sum: { totalPrice: true },
            where: {
                room: { hotel: { ownerId: userId } },
                status: "CONFIRMED",
            },
        }),
    ]);

    const totalRevenue = Number(revenueResult._sum.totalPrice) || 0;

    // 2. Fetch Owner's Hotels
    const hotels = await prisma.hotel.findMany({
        where: { ownerId: userId },
        include: {
            _count: {
                select: { rooms: true },
            },
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Owner Dashboard</h1>
                    <p className="text-gray-500 mt-1">Monitor your properties and financial performance.</p>
                </div>
                <Link
                    href="/hotels/new"
                    className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    List New Property
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard
                    title="Total Properties"
                    value={hotelsCount.toString()}
                    icon={<Building2 className="w-6 h-6 text-indigo-600" />}
                    color="bg-indigo-50"
                />
                <StatCard
                    title="Active Bookings"
                    value={activeBookingsCount.toString()}
                    icon={<CalendarCheck className="w-6 h-6 text-green-600" />}
                    color="bg-green-50"
                />
                <StatCard
                    title="Lifetime Earnings"
                    value={currencyFormatter.format(totalRevenue)}
                    icon={<DollarSign className="w-6 h-6 text-emerald-600" />}
                    color="bg-emerald-50"
                    highlight
                />
            </div>

            {/* Property List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h2 className="font-bold text-xl text-gray-800">Your Properties</h2>
                    <span className="text-sm text-gray-500 font-medium">{hotelsCount} Units Total</span>
                </div>

                {hotels.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Building2 className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">No properties listed yet</h3>
                        <p className="text-gray-500 mb-6 max-w-xs mx-auto">Start earning by listing your first hotel or property on our platform.</p>
                        <Link
                            href="/hotels/new"
                            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-6 py-2.5 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
                        >
                            List Your First Property
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4">Rooms</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {hotels.map((hotel) => (
                                    <tr key={hotel.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-5">
                                            <div className="font-bold text-gray-900">{hotel.name}</div>
                                            <div className="text-sm text-gray-500">{hotel.address}</div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700">
                                                {hotel._count.rooms} Rooms
                                            </span>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className={clsx(
                                                "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold",
                                                hotel.isVerified ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                            )}>
                                                <div className={clsx("w-1.5 h-1.5 rounded-full", hotel.isVerified ? "bg-green-500" : "bg-amber-500")} />
                                                {hotel.isVerified ? "Verified" : "Pending Verification"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <Link
                                                href={`/dashboard/owner/hotels/${hotel.id}`}
                                                className="text-indigo-600 font-semibold text-sm hover:underline"
                                            >
                                                Manage
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ title, value, icon, color, highlight = false }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    color: string;
    highlight?: boolean;
}) {
    return (
        <div className={clsx(
            "p-6 rounded-2xl border transition-all hover:shadow-md",
            highlight ? "bg-white border-emerald-100 shadow-sm" : "bg-white border-gray-100"
        )}>
            <div className="flex items-center gap-4">
                <div className={clsx("w-12 h-12 rounded-xl flex items-center justify-center", color)}>
                    {icon}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{title}</p>
                    <h3 className="text-2xl font-black text-gray-900 mt-0.5">{value}</h3>
                </div>
            </div>
        </div>
    );
}
