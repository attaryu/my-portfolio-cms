import type { IToken } from '../../services/token-manager';

export interface ITokenResult {
	accessToken: IToken;
	refreshToken: IToken;
}

export interface IOwnerLoginUseCase {
	execute(email: string, password: string): Promise<ITokenResult>;
}
