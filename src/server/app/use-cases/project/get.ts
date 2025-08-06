import type { IProjectOutDTO } from '../../dtos/project/out';

export interface IGetProjectUseCase {
	execute(projectId: string): Promise<IProjectOutDTO>;
}
