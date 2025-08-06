import type { ICreateProjectDTO } from '../../dtos/project/create';
import type { IProjectOutDTO } from '../../dtos/project/detailed-out';

export interface ICreateProjectUseCase {
	execute(newProject: ICreateProjectDTO): Promise<IProjectOutDTO>;
}
