import type {
	IToken,
	ITokenManager,
	ITokenPayload,
} from '@/server/app/services/token-manager';

import { errors, jwtVerify, SignJWT } from 'jose';

import { TokenManagerErrors } from '../errors/services/token-manager';

export class TokenManager implements ITokenManager {
	private refreshTokenKey: Uint8Array<ArrayBuffer>;
	private accessTokenKey: Uint8Array<ArrayBuffer>;

	constructor() {
		const refreshTokenKey = process.env.REFRESH_TOKEN_KEY;
		const accessTokenKey = process.env.ACCESS_TOKEN_KEY;

		if (!refreshTokenKey || !accessTokenKey) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		const textEncoder = new TextEncoder();

		this.refreshTokenKey = textEncoder.encode(refreshTokenKey);
		this.accessTokenKey = textEncoder.encode(accessTokenKey);
	}

	async generateAccessToken(id: string): Promise<IToken> {
		const raw = process.env.ACCESS_TOKEN_EXPIRY;
		const now = Date.now() / 1000;
		const expireIn = raw ? now + parseInt(raw, 10) : now + 60 * 30;

		const value = await new SignJWT({ token_type: 'access', id })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(expireIn)
			.sign(this.accessTokenKey);

		return { value, expireIn };
	}

	async generateRefreshToken(id: string): Promise<IToken> {
		const raw = process.env.REFRESH_TOKEN_EXPIRY;
		const now = Date.now() / 1000;
		const expireIn = raw ? now + parseInt(raw, 10) : now + 60 * 60 * 24 * 3;

		const value = await new SignJWT({ token_type: 'refresh', id })
			.setProtectedHeader({ alg: 'HS256' })
			.setExpirationTime(expireIn)
			.sign(this.refreshTokenKey);

		return { value, expireIn };
	}

	async verifyToken(token: string): Promise<ITokenPayload | null> {
		try {
			return await this._verify(token, this.accessTokenKey);
		} catch (error) {
			let outerError = error;

			try {
				return await this._verify(token, this.refreshTokenKey);
			} catch (innerError) {
				outerError = innerError;
			}

			if (
				outerError instanceof errors.JWSInvalid ||
				outerError instanceof errors.JWTExpired
			) {
				return null;
			}

			throw outerError;
		}
	}

	private async _verify(
		token: string,
		key: Uint8Array<ArrayBuffer>
	): Promise<ITokenPayload> {
		return await jwtVerify<ITokenPayload>(token, key).then(
			({ payload }) => payload
		);
	}
}
