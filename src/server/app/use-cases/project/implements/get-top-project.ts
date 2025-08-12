import { IProjectRepository } from '@/server/app/repositories/project';
import { IGetTopProjectUseCase } from '../get-top-project';
import { ITopProjectOutDTO } from '@/server/app/dtos/project/top-project-out';

export class GetTopProjectUseCase implements IGetTopProjectUseCase {
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(): Promise<ITopProjectOutDTO[]> {
		return await this.projectRepository.getTopProjects();
	}
}
