import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { Owner, PrismaClient } from '../databases/prisma/generated/prisma';

import { OwnerEntity } from '@/server/domain/entities/owner';
import { Email } from '@/server/domain/value-objects/email';
import { Password } from '@/server/domain/value-objects/password';
import { RefreshToken } from '@/server/domain/value-objects/refresh-token';

export class OwnerRepository implements IOwnerRepository {
	constructor(private readonly db: PrismaClient) {}

	async getOwnerById(id: string): Promise<OwnerEntity | null> {
		const owner = await this.db.owner.findUnique({ where: { id } });
		return owner ? this.mapper(owner) : null;
	}

	async getOwnerByEmail(email: string): Promise<OwnerEntity | null> {
		const owner = await this.db.owner.findUnique({ where: { email } });
		return owner ? this.mapper(owner) : null;
	}

	async updateOwner(owner: OwnerEntity): Promise<void> {
		await this.db.owner.update({
			where: { id: owner.id! },
			data: {
				email: owner.email.value,
				password: owner.password.value,
				address: owner.address,
				coverUrl: owner.coverUrl,
				refreshToken: owner.refreshToken?.value,
			},
		});
	}

	private mapper(owner: Owner): OwnerEntity {
		return new OwnerEntity(
			owner.id,
			Email.create(owner.email),
			Password.create(owner.password),
			owner.address,
			owner.coverUrl,
			RefreshToken.create(owner.refreshToken!),
			owner.createdAt,
			owner.updatedAt
		);
	}
}
