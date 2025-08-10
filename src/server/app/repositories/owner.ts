import type { OwnerEntity } from '@/server/domain/entities/owner';
import type { IOwnerPublicInfoOutDTO } from '../dtos/owner/public-info-out';
import type { IOwnerPublicInfoPayloadDTO } from '../dtos/owner/public-info-update';

export interface IOwnerRepository {
	getOwnerById(id: string): Promise<OwnerEntity | null>;
	getOwnerByEmail(email: string): Promise<OwnerEntity | null>;
	updateOwner(owner: OwnerEntity): Promise<void>;
	updateOwnerPublicInfo(
		ownerId: string,
		data: IOwnerPublicInfoPayloadDTO
	): Promise<IOwnerPublicInfoOutDTO>;
	getOwnerPublicInfo(): Promise<IOwnerPublicInfoOutDTO | null>;
}
