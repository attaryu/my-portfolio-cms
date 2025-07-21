import type {
	ITokenManager,
	ITokenPayload,
	ITokenResult,
} from '@/server/app/services/token-manager';

import { sign, verify } from 'jsonwebtoken';

import { TokenManagerErrors } from '../errors/services/token-manager';

export class TokenManager implements ITokenManager {
	private readonly _seconds = 1;
	private readonly _minutes = 60 * this._seconds;
	private readonly _hours = 60 * this._minutes;
	private readonly _days = 24 * this._hours;
	private readonly key = process.env.JWT_SECRET;

	public generateToken(data: ITokenPayload): ITokenResult {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		const accessTokenDuration = this._minutes * 15; // 15 minutes
		const refreshTokenDuration = this._days * 3; // 3 days

		const accessToken = sign(data, this.key, {
			expiresIn: accessTokenDuration,
		});

		const refreshToken = sign(data, this.key, {
			expiresIn: refreshTokenDuration,
		});

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

	public verifyToken(token: string): ITokenPayload {
		if (!this.key) {
			throw new TokenManagerErrors.SecretNotDefined();
		}

		try {
			return verify(token, this.key) as ITokenPayload;
		} catch (error) {
			throw new TokenManagerErrors.InvalidToken();
		}
	}
}
