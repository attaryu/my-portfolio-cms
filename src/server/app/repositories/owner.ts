import type { OwnerEntity } from '@/server/domain/entities/owner';

export interface IOwnerRepository {
	getOwnerById(id: string): Promise<OwnerEntity>;
	getOwnerByEmail(email: string): Promise<OwnerEntity | null>;
	updateOwner(owner: OwnerEntity): Promise<void>;
}
