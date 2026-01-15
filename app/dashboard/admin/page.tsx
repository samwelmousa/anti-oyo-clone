import { prisma } from "@/lib/prisma";
import AdminHotelTable from "@/components/AdminHotelTable";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
    const rawHotels = await prisma.hotel.findMany({
        include: {
            owner: {
                select: {
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });

    // Serialize for Client Component
    const hotels = rawHotels.map(h => ({
        ...h,
        createdAt: h.createdAt.toISOString(),
        updatedAt: h.updatedAt.toISOString(),
    }));

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 mt-2">Manage and verify property listings across the platform.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-xl font-semibold">Hotel Quality Control</h2>
                </div>
                <AdminHotelTable initialHotels={hotels} />
            </div>
        </div>
    );
}
