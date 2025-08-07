import type { ITechPayloadDTO } from '../../dtos/tech/create';
import type { ITechOutDTO } from '../../dtos/tech/out';

export interface ICreateTechUseCase {
	execute(data: ITechPayloadDTO): Promise<ITechOutDTO>;
}
