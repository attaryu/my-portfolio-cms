import type { IProjectOutDTO } from '../../dtos/project/detailed-out';

export interface IGetProjectUseCase {
	execute(projectId: string): Promise<IProjectOutDTO>;
}
