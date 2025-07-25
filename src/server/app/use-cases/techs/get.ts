import { ITechOut } from '../../dtos/tech/out';

export interface IGetTechUseCase {
	execute(techId: string): Promise<ITechOut>;
}
