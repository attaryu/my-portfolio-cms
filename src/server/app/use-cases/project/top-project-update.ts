import type { IUpdateTopProjectsDTO } from '../../dtos/project/top-project-update';

export interface ITopProjectUpdateUseCase {
	execute(topProjectEntries: IUpdateTopProjectsDTO): Promise<void>;
}
