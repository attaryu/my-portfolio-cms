import type { ITechCreate } from '../../dtos/tech/create';
import type { ITechOutDTO } from '../../dtos/tech/out';

export interface IUpdateTechUseCase {
	execute(techId: string, data: ITechCreate): Promise<ITechOutDTO>;
}
