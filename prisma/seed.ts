import { PrismaClient } from '@prisma/client';
import { MOCK_HOTELS } from '../lib/mock-data';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting seed...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 1. Create a Demo Owner/User
    const user = await prisma.user.upsert({
        where: { email: 'demo@oyo.clone' },
        update: {
            password: hashedPassword,
        },
        create: {
            id: 'demo_user_123',
            email: 'demo@oyo.clone',
            name: 'Demo Traveler',
            password: hashedPassword,
            role: 'USER',
        },
    });
    console.log('👤 Created User:', user.email);

    // 2. Seed Hotels from MOCK_HOTELS
    for (const mockHotel of MOCK_HOTELS) {
        const hotel = await prisma.hotel.upsert({
            where: { id: mockHotel.id },
            update: {},
            create: {
                id: mockHotel.id,
                name: mockHotel.name,
                description: `Experience the best stay at ${mockHotel.name}. Located centrally in ${mockHotel.location}.`,
                address: mockHotel.location,
                lat: mockHotel.coordinates.lat,
                lng: mockHotel.coordinates.lng,
                images: [mockHotel.images[0]],
                isVerified: mockHotel.isVerified,
            },
        });

        console.log(`🏨 Created Hotel: ${hotel.name}`);

        // 4. Create a standard room for each hotel
        await prisma.room.upsert({
            where: { slug: mockHotel.slug }, // Using the slug from mock data
            update: {},
            create: {
                title: 'Standard Double Room',
                slug: mockHotel.slug,
                price: mockHotel.price - 0.01,
                description: 'A comfortable room with all basic amenities.',
                amenities: ['WiFi', 'AC', 'Parking'],
                hotelId: hotel.id,
            },
        });
    }

    console.log('✅ Seeding complete.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
