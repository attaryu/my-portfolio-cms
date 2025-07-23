import type {
	ITokenManager,
	ITokenPayload,
	ITokenResult,
} from '@/server/app/services/token-manager';

import { jwtVerify, SignJWT } from 'jose';

import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { TokenManagerErrors } from '../errors/services/token-manager';

export class TokenManager implements ITokenManager {
	private readonly _seconds = 1;
	private readonly _minutes = 60 * this._seconds;
	private readonly _hours = 60 * this._minutes;
	private readonly _days = 24 * this._hours;
	private readonly key = process.env.JWT_SECRET;

	public async generateToken(data: ITokenPayload): Promise<ITokenResult> {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		const key = new TextEncoder().encode(this.key);

		const accessTokenDuration = this._minutes * 15; // 15 minutes
		const refreshTokenDuration = this._days * 3; // 3 days

		const accessToken = await new SignJWT({ ...data })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('+15m')
			.sign(key);

		const refreshToken = await new SignJWT({ ...data })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('+3d')
			.sign(key);

		return {
			accessToken: {
				value: accessToken,
				expiresIn: accessTokenDuration,
			},
			refreshToken: {
				value: refreshToken,
				expiresIn: refreshTokenDuration,
			},
		};
	}

	async verifyToken(token: string): Promise<ITokenPayload> {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		try {
			const key = new TextEncoder().encode(this.key);

			return (await jwtVerify<ITokenPayload>(token, key)).payload;
		} catch (error) {
			console.error(error);
			throw new OwnerUseCaseErrors.InvalidToken();
		}
	}
}
