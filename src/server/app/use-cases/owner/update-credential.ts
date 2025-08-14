import { IUpdateOwnerCredentialDTO } from '../../dtos/owner/update-credential';

export interface IUpdateOwnerCredentialUseCase {
	execute(data: IUpdateOwnerCredentialDTO): Promise<void>;
}
