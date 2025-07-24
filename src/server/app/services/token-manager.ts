export interface ITokenPayload {
	id: string;
	token_type: 'access' | 'refresh';
}

export interface IToken {
	value: string;
	expiresIn: number;
}

export interface ITokenManager {
	generateAccessToken(id: string): Promise<IToken>;
	generateRefreshToken(id: string): Promise<IToken>;
	verifyToken(token: string): Promise<ITokenPayload | null>;
}
