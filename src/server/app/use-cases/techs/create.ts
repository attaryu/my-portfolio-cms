import type { ITechCreate } from '../../dtos/tech/create';
import type { ITechOutDTO } from '../../dtos/tech/out';

export interface ICreateTechUseCase {
	execute(data: ITechCreate): Promise<ITechOutDTO>;
}
