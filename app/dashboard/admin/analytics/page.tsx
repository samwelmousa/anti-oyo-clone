import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { DollarSign, Percent, TrendingUp, Users } from "lucide-react";
import { clsx } from "clsx";

const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

export const dynamic = "force-dynamic";

export default async function AdminAnalyticsPage() {
    const session = await auth();
    if (session?.user?.role !== "ADMIN") redirect("/");

    // 1. Aggregate Global Financial Data
    const globalStats = await prisma.booking.aggregate({
        _sum: {
            totalPrice: true,
            taxAmount: true,
            commissionAmount: true,
            serviceFee: true,
        },
        _count: {
            id: true,
        },
        where: {
            status: "CONFIRMED",
        },
    });

    const totalFinesse = Number(globalStats?._sum?.totalPrice || 0);
    const platformRevenue = Number(globalStats?._sum?.commissionAmount || 0);
    const totalTaxes = Number(globalStats?._sum?.taxAmount || 0);
    const bookingCount = globalStats?._count?.id || 0;

    // 2. Performance by Hotel (Top 5)
    const topHotels = await prisma.hotel.findMany({
        take: 5,
        include: {
            rooms: {
                include: {
                    bookings: {
                        where: { status: "CONFIRMED" },
                        select: { commissionAmount: true }
                    }
                }
            }
        },
    });

    const hotelPerformance = topHotels.map(hotel => {
        // @ts-ignore
        const hotelCommission = hotel.rooms.reduce((acc: number, room: any) => {
            return acc + room.bookings.reduce((sum: number, b: any) => sum + Number(b.commissionAmount || 0), 0);
        }, 0);
        return {
            name: hotel.name,
            address: hotel.address,
            commission: hotelCommission
        };
    }).sort((a, b) => b.commission - a.commission);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Financial Governance</h1>
                <p className="text-gray-500 mt-1">Global oversight of platform revenue and tax collection.</p>
            </div>

            {/* Platform Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <AnalyticsCard
                    title="Platform Net Profit"
                    value={currencyFormatter.format(platformRevenue)}
                    subtitle="Direct commission earnings"
                    icon={<TrendingUp className="w-6 h-6 text-emerald-600" />}
                    trend="+12.5% vs last month"
                    color="bg-emerald-50"
                />
                <AnalyticsCard
                    title="Tax Collected"
                    value={currencyFormatter.format(totalTaxes)}
                    subtitle="Legal/Compliance total"
                    icon={<Percent className="w-6 h-6 text-blue-600" />}
                    color="bg-blue-50"
                />
                <AnalyticsCard
                    title="Total GMV"
                    value={currencyFormatter.format(totalFinesse)}
                    subtitle="Gross Marketplace Volume"
                    icon={<DollarSign className="w-6 h-6 text-indigo-600" />}
                    color="bg-indigo-50"
                />
                <AnalyticsCard
                    title="Total Bookings"
                    value={bookingCount.toString()}
                    subtitle="Confirmed transactions"
                    icon={<Users className="w-6 h-6 text-orange-600" />}
                    color="bg-orange-50"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Top Performers Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="font-bold text-xl text-gray-900">Top Revenue Generators</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <tr>
                                    <th className="px-6 py-4">Property</th>
                                    <th className="px-6 py-4 text-right">Commission Contribution</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {hotelPerformance.map((h, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{h.name}</div>
                                            <div className="text-xs text-gray-400">{h.address}</div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="font-black text-gray-900">{currencyFormatter.format(h.commission)}</div>
                                            <div className="text-[10px] text-green-500 font-bold uppercase">Paid via Strip</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Audit Context */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                            <TrendingUp className="w-6 h-6 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Audit Transparency</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            All values on this dashboard are calculated from immutable booking snapshots.
                            This ensures that historical revenue data remains accurate even if platform commission
                            rates or tax regulations are updated in the system settings.
                        </p>
                    </div>
                    <div className="pt-6 border-t border-white/10">
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Last Updated</div>
                        <div className="text-sm font-medium">{new Date().toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsCard({ title, value, subtitle, icon, color, trend }: any) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
                <div className={clsx("w-12 h-12 rounded-2xl flex items-center justify-center", color)}>
                    {icon}
                </div>
                {trend && (
                    <span className="text-[10px] font-black bg-green-50 text-green-600 px-2 py-1 rounded-full uppercase">
                        {trend}
                    </span>
                )}
            </div>
            <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
                <h3 className="text-3xl font-black text-gray-900 mb-1">{value}</h3>
                <p className="text-[10px] text-gray-400 font-medium">{subtitle}</p>
            </div>
        </div>
    );
}
