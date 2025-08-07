import type { IProjectPayloadDTO } from '../../dtos/project/create';
import type { IProjectDetailedOutDTO } from '../../dtos/project/detailed-out';

export interface ICreateProjectUseCase {
	execute(newProject: IProjectPayloadDTO): Promise<IProjectDetailedOutDTO>;
}
