import type { ICreateProjectDTO } from '../../dtos/project/create';
import type { IProjectDetailedOutDTO } from '../../dtos/project/detailed-out';

export interface ICreateProjectUseCase {
	execute(newProject: ICreateProjectDTO): Promise<IProjectDetailedOutDTO>;
}
