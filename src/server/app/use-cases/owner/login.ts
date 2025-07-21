import type { ITokenResult } from '../../services/token-manager';

export interface IOwnerLoginUseCase {
	execute(email: string, password: string): Promise<ITokenResult>;
}
