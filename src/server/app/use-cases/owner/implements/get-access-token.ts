import { OwnerUseCaseErrors } from '@/server/app/errors/use-cases/owner';
import type { IOwnerRepository } from '@/server/app/repositories/owner';
import type {
	IToken,
	ITokenManager,
} from '@/server/app/services/token-manager';
import type { IOwnerGetAccessTokenUseCase } from '../get-access-token';

export class OwnerGetAccessTokenUseCase implements IOwnerGetAccessTokenUseCase {
	constructor(
		private readonly ownerRepository: IOwnerRepository,
		private readonly tokenManager: ITokenManager
	) {}

	async execute(refreshToken: string): Promise<IToken> {
		const tokenPayload = await this.tokenManager.verifyToken(refreshToken);

		if (!tokenPayload) {
			throw new OwnerUseCaseErrors.InvalidToken('refresh');
		}
		
		const owner = await this.ownerRepository.getOwnerById(tokenPayload.id);

		if (!owner) {
			throw new OwnerUseCaseErrors.NotFound();
		}

		owner.refreshToken?.isSameAs(refreshToken);

		const accessToken = await this.tokenManager.generateAccessToken(owner.id!);

		return accessToken;
	}
}
