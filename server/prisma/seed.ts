import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const users = [
        {
            email: 'admin@example.com',
            name: 'Admin User',
            password: '$2a$12$75XtkHktvF5L7CcAXFl4u.XV6lEVLScmZ2Y0HUaqYtboLUzSAeIWu', // Plain text 12345678
            role: Role.ADMIN
        },
        {
            email: 'user1@example.com',
            name: 'Regular User 1',
            password: '$2a$12$75XtkHktvF5L7CcAXFl4u.XV6lEVLScmZ2Y0HUaqYtboLUzSAeIWu', // Plain text 12345678
            role: Role.USER
        },
        {
            email: 'user2@example.com',
            name: 'Regular User 2',
            password: '$2a$12$75XtkHktvF5L7CcAXFl4u.XV6lEVLScmZ2Y0HUaqYtboLUzSAeIWu', // Plain text 12345678
            role: Role.USER
        }
    ];

    for (const user of users) {
        await prisma.user.upsert({
            where: { email: user.email },
            update: {},
            create: user
        });
    }

    console.log('Seeded users.');
}

main()
    .catch((e) => {
        console.error(e);
        // process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
