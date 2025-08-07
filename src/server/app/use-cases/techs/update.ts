import type { ITechPayloadDTO } from '../../dtos/tech/create';
import type { ITechOutDTO } from '../../dtos/tech/out';

export interface IUpdateTechUseCase {
	execute(techId: string, data: ITechPayloadDTO): Promise<ITechOutDTO>;
}
