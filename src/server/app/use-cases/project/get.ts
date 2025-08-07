import type { IProjectDetailedOutDTO } from '../../dtos/project/detailed-out';

export interface IGetProjectUseCase {
	execute(projectId: string): Promise<IProjectDetailedOutDTO>;
}
