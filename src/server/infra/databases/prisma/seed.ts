import { Hashing } from '../../services/hashing';
import { PrismaClient } from './generated/prisma';

const prisma = new PrismaClient();

async function main() {
	const hashing = new Hashing();
	const hashedPassword = await hashing.generateHash('password123');

	const owner = await prisma.owner.create({
		data: {
			address: 'Jakarta, Indonesia',
			coverUrl:
				'https://images.unsplash.com/photo-1559366682-b24d010f6d65?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
			email: 'test@mail.com',
			password: hashedPassword,
		},
	});

	console.log('Owner created:', owner);
}

main()
	.then(() => prisma.$disconnect())
	.catch((e) => {
		console.error('Error during seeding:', e);
		prisma.$disconnect();
		process.exit(1);
	});
