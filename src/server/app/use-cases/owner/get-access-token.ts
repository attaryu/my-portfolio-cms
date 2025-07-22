import { ITokenResult } from '../../services/token-manager';

export interface IOwnerGetAccessTokenUseCase {
	execute(refreshToken: string): Promise<ITokenResult['accessToken']>;
}
