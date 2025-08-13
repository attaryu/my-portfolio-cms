import { ILandingOutDTO } from '../dtos/landing/out';

export interface ILandingRepository {
  getLanding(): Promise<ILandingOutDTO | null>;
}
