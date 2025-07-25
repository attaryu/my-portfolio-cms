import { CheckOwnerAccessTokenUseCase } from '@/server/app/use-cases/owner/implements/check-access-token';
import { TokenManager } from '@/server/infra/services/token-manager';
import { CheckOwnerAccessTokenMiddleware } from './owner/check-access-token';

export function createCheckOwnerAccessTokenMiddleware() {
	const useCase = new CheckOwnerAccessTokenUseCase(new TokenManager());
	return new CheckOwnerAccessTokenMiddleware(useCase);
}
