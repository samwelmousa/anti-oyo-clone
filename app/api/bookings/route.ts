import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { differenceInCalendarDays } from 'date-fns';

export async function POST(request: Request) {
    try {
        const session = await auth();

        // Server-side Auth Check
        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: 'Unauthorized: You must be logged in to book.' },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { roomId, startDate, endDate } = body;
        const userId = session.user.id;

        if (!roomId || !startDate || !endDate) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (start < today) {
            return NextResponse.json(
                { error: 'Cannot book dates in the past' },
                { status: 400 }
            );
        }

        if (start >= end) {
            return NextResponse.json(
                { error: 'Check-out date must be after check-in date' },
                { status: 400 }
            );
        }

        // Fetch Room to get price
        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        // Calculate Commercial Costs
        const TAX_RATE = 0.12;
        const SERVICE_FEE_RATE = 0.05;
        const COMMISSION_RATE = 0.15;

        const nights = differenceInCalendarDays(end, start);
        const baseAmount = nights * Number(room.price);

        const taxAmount = baseAmount * TAX_RATE;
        const serviceFee = baseAmount * SERVICE_FEE_RATE;
        const totalPrice = baseAmount + taxAmount + serviceFee;
        const commissionAmount = baseAmount * COMMISSION_RATE;

        // Double Booking Prevention
        const existingBooking = await prisma.booking.findFirst({
            where: {
                roomId,
                OR: [
                    {
                        startDate: { lte: end },
                        endDate: { gte: start },
                    },
                ],
            },
        });

        if (existingBooking) {
            return NextResponse.json(
                { error: 'Room is already booked for these dates' },
                { status: 409 }
            );
        }

        // Create Booking with Financial Snapshots
        const booking = await prisma.booking.create({
            data: {
                userId,
                roomId,
                startDate: start,
                endDate: end,
                totalPrice,
                taxAmount,
                serviceFee,
                commissionAmount,
            },
        });

        return NextResponse.json(booking, { status: 200 });
    } catch (error) {
        console.error('Booking error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
