import type { IUpdateTopProjectsDTO } from '../dtos/project/top-project-update';
import type { IQuery } from '../dtos/query';

import { ProjectEntity } from '@/server/domain/entities/project';

export interface IProjectRepository {
	createProject(project: ProjectEntity): Promise<ProjectEntity>;
	getProjectById(projectId: string): Promise<ProjectEntity | null>;
	getRowCount(query?: IQuery): Promise<number>;
	getProjects(query?: IQuery): Promise<ProjectEntity[]>;
	updateProject(project: ProjectEntity): Promise<ProjectEntity>;
	deleteMany(projectIds: string[]): Promise<void>;
	updateTopProjects(
		ownerId: string,
		topProjectEntries: IUpdateTopProjectsDTO
	): Promise<void>;
}
