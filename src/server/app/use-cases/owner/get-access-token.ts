import { IToken } from '../../services/token-manager';

export interface IOwnerGetAccessTokenUseCase {
	execute(refreshToken: string): Promise<IToken>;
}
