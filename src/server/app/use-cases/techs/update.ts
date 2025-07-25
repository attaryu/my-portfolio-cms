import type { ITechCreate } from '../../dtos/tech/create';
import type { ITechOut } from '../../dtos/tech/out';

export interface IUpdateTechUseCase {
	execute(techId: string, data: ITechCreate): Promise<ITechOut>;
}
