import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import { ITokenManager } from '@/server/app/services/token-manager';
import { ICheckOwnerAccessTokenUseCase } from '../check-access-token';

export class CheckOwnerAccessTokenUseCase
	implements ICheckOwnerAccessTokenUseCase
{
	constructor(private readonly tokenManager: ITokenManager) {}

	async execute(accessToken: string): Promise<boolean> {
		const payload = await this.tokenManager.verifyToken(accessToken);

		if (!payload || payload.token_type !== 'access') {
			throw new OwnerUseCaseErrors.InvalidToken('access');
		}

		return true;
	}
}
