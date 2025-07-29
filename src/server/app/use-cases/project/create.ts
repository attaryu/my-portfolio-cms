import type { ICreateProjectDTO } from '../../dtos/project/create';

export interface ICreateProjectUseCase {
	execute(newProject: ICreateProjectDTO): Promise<string>;
}
