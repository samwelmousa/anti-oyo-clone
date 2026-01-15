"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath, revalidateTag } from "next/cache";

export async function toggleVerification(hotelId: string) {
    const session = await auth();

    // Security Check: Ensure caller is ADMIN
    if (!session || session.user?.role !== "ADMIN") {
        throw new Error("Unauthorized: Only Admins can verify hotels.");
    }

    const hotel = await prisma.hotel.findUnique({
        where: { id: hotelId },
    });

    if (!hotel) {
        throw new Error("Hotel not found");
    }

    await prisma.hotel.update({
        where: { id: hotelId },
        data: { isVerified: !hotel.isVerified },
    });

    revalidatePath("/dashboard/admin");
    revalidatePath("/search");
    // @ts-ignore - Next.js revalidateTag type mismatch in some environments
    revalidateTag("hotels");

    return { success: true };
}

export async function createHotel(data: any) {
    const session = await auth();
    if (!session || (session.user?.role !== "ADMIN" && session.user?.role !== "OWNER")) {
        throw new Error("Unauthorized");
    }

    const hotel = await prisma.hotel.create({
        data,
    });

    // @ts-ignore
    revalidateTag("hotels");
    revalidatePath("/search");

    return hotel;
}
