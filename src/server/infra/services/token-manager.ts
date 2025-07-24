import type {
	IToken,
	ITokenManager,
	ITokenPayload,
} from '@/server/app/services/token-manager';

import { errors, jwtVerify, SignJWT } from 'jose';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { TokenManagerErrors } from '../errors/services/token-manager';

export class TokenManager implements ITokenManager {
	private readonly _seconds = 1;
	private readonly _minutes = 60 * this._seconds;
	private readonly _hours = 60 * this._minutes;
	private readonly _days = 24 * this._hours;
	private readonly key = process.env.JWT_SECRET;

	async generateAccessToken(id: string): Promise<IToken> {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		const accessToken = await new SignJWT({
			id,
			token_type: 'access',
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('+15m')
			.sign(new TextEncoder().encode(this.key));

		return {
			value: accessToken,
			expiresIn: this._minutes * 15,
		};
	}

	async generateRefreshToken(id: string): Promise<IToken> {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		const key = new TextEncoder().encode(this.key);

		const refreshToken = await new SignJWT({
			id,
			token_type: 'refresh',
		})
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('+3d')
			.sign(new TextEncoder().encode(this.key));

		return {
			value: refreshToken,
			expiresIn: this._days * 3,
		};
	}

	async verifyToken(token: string): Promise<ITokenPayload | null> {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		try {
			return (
				await jwtVerify<ITokenPayload>(
					token,
					new TextEncoder().encode(this.key)
				)
			).payload;
		} catch (error) {
			if (error instanceof errors.JWSInvalid) {
				return null;
			}
			
			throw error;
		}
	}
}
