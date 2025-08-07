import type { IProjectPayloadDTO } from '../../dtos/project/create';
import type { IProjectDetailedOutDTO } from '../../dtos/project/detailed-out';

export interface IUpdateProjectUseCase {
	execute(
		projectId: string,
		data: IProjectPayloadDTO
	): Promise<IProjectDetailedOutDTO>;
}
