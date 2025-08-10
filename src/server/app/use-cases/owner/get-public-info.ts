import type { IOwnerPublicInfoOutDTO } from '../../dtos/owner/public-info-out';

export interface IGetOwnerPublicInfoUseCase {
	execute(): Promise<IOwnerPublicInfoOutDTO>;
}
