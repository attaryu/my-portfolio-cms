export interface ITokenPayload {
	id: string;
}

interface IToken {
	value: string;
	expiresIn: number;
}

export interface ITokenResult {
	accessToken: IToken;
	refreshToken: IToken;
}

export interface ITokenManager {
	generateToken(data: ITokenPayload): ITokenResult;
	verifyToken(token: string): ITokenPayload;
}
