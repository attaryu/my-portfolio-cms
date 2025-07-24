import type { ITechCreate } from '../../dtos/tech/create';
import type { ITechOut } from '../../dtos/tech/out';

export interface ICreateTechUseCase {
	execute(data: ITechCreate): Promise<ITechOut>;
}
