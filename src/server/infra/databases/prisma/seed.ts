import { Hashing } from '../../services/hashing';
import { PrismaClient } from './generated';

const prisma = new PrismaClient();

async function main() {
	const hashing = new Hashing();
	const hashedPassword = await hashing.generateHash(
		(process.env.DEFAULT_PASSWORD as string).trim()
	);

	await prisma.$queryRaw`DELETE FROM owners WHERE 1 = 1`;

	const owner = await prisma.owner.create({
		data: {
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
