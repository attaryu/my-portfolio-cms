import type { IOwnerPublicInfoOutDTO } from '../../dtos/owner/public-info-out';
import type { IOwnerPublicInfoPayloadDTO } from '../../dtos/owner/public-info-update';

export interface IOwnerPublicInfoUpdateUseCase {
	execute(
		token: string,
		data: IOwnerPublicInfoPayloadDTO
	): Promise<IOwnerPublicInfoOutDTO>;
}
