import { ILandingOutDTO } from '../../dtos/landing/out';

export interface IGetLandingUseCase {
  execute(): Promise<ILandingOutDTO>;
}
