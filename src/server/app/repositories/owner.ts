import type { OwnerEntity } from '@/server/domain/entities/owner';

export interface IOwnerRepository {
	getOwnerByEmail(email: string): Promise<OwnerEntity | null>;
	updateOwner(owner: OwnerEntity): Promise<void>;
}
