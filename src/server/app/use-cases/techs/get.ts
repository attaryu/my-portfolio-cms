import { ITechOutDTO } from '../../dtos/tech/out';

export interface IGetTechUseCase {
	execute(techId: string): Promise<ITechOutDTO>;
}
