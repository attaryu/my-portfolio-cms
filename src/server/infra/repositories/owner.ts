import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { PrismaClient } from '../databases/prisma/generated/prisma';

import { OwnerEntity } from '@/server/domain/entities/owner';
import { Email } from '@/server/domain/value-objects/email';
import { Password } from '@/server/domain/value-objects/password';

export class OwnerRepository implements IOwnerRepository {
	constructor(private readonly db: PrismaClient) {}

	async getOwnerByEmail(email: string): Promise<OwnerEntity | null> {
		const owner = await this.db.owner.findUnique({ where: { email } });

		return owner
			? new OwnerEntity(
					owner.id,
					new Email(owner.email),
					new Password(owner.password),
					owner.address,
					owner.coverUrl,
					owner.refreshToken,
					owner.createdAt,
					owner.updatedAt
			  )
			: null;
	}

	async updateOwner(owner: OwnerEntity): Promise<void> {
		await this.db.owner.update({
			where: { id: owner.id! },
			data: {
				email: owner.email.value,
				password: owner.password.value,
				address: owner.address,
				coverUrl: owner.coverUrl,
				refreshToken: owner.refreshToken,
			},
		});
	}
}
