import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type { Owner, PrismaClient } from '../databases/prisma/generated';
import type { IOwnerPublicInfoOutDTO } from '@/server/app/dtos/owner/public-info-out';
import type { IOwnerPublicInfoPayloadDTO } from '@/server/app/dtos/owner/public-info-update';

import { OwnerEntity } from '@/server/domain/entities/owner';
import { Email } from '@/server/domain/value-objects/email';
import { Password } from '@/server/domain/value-objects/password';
import { RefreshToken } from '@/server/domain/value-objects/refresh-token';

export class OwnerRepository implements IOwnerRepository {
	private readonly publicInfoQuery = {
		id: true,
		contact_email: true,
		about: true,
		address: true,
		cover_url: true,
		social_media: {
			select: {
				id: true,
				name: true,
				url: true,
			},
		},
	};

	constructor(private readonly db: PrismaClient) {}

	async getOwner(): Promise<OwnerEntity | null> {
		const owner = await this.db.owner.findFirst();
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
				refresh_token: owner.refreshToken?.value ?? null,
			},
		});
	}

	async getOwnerPublicInfo(): Promise<IOwnerPublicInfoOutDTO | null> {
		return await this.db.owner.findFirst({
			select: this.publicInfoQuery,
		});
	}

	async updateOwnerPublicInfo(
		ownerId: string,
		data: IOwnerPublicInfoPayloadDTO
	): Promise<IOwnerPublicInfoOutDTO> {
		return await this.db.owner.update({
			select: this.publicInfoQuery,
			where: { id: ownerId },
			data: {
				contact_email: data.contact_email,
				address: data.address,
				cover_url: data.cover_url,
				about: data.about,
				social_media: {
					deleteMany: { owner_id: ownerId },
					createMany: {
						data: data.social_media,
					},
				},
			},
		});
	}

	private mapper(owner: Owner): OwnerEntity {
		return new OwnerEntity(
			owner.id,
			Email.create(owner.email),
			Password.create(owner.password),
			RefreshToken.create(owner.refresh_token!),
			owner.created_at,
			owner.updated_at
		);
	}
}
