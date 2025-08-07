import type { IFilterDTO } from '@/server/app/dtos/filter';
import type { IPaginationDTO } from '@/server/app/dtos/pagination';
import {
	ProjectOutDTO,
	type IProjectOutDTO,
} from '@/server/app/dtos/project/out';
import type { IProjectRepository } from '@/server/app/repositories/project';
import type { IGetAllProjectsUseCase } from '../get-all';

import { PaginationDTO } from '@/server/app/dtos/pagination';
import { calculatePagination } from '@/server/app/helpers/calculate-pagination';

export class GetAllProjectsUseCase implements IGetAllProjectsUseCase {
	constructor(private readonly projectRepository: IProjectRepository) {}

	async execute(filters?: IFilterDTO): Promise<IPaginationDTO<IProjectOutDTO>> {
		const search = filters?.search?.trim().toLowerCase();
		const total = await this.projectRepository.getRowCount({ search });

		const pagination = calculatePagination(
			total,
			filters?.limit,
			filters?.page
		);

		const projects = await this.projectRepository
			.getProjects({
				search,
				skip: pagination.skip,
				limit: pagination.metadata.limit,
				orderBy: filters?.order,
				sort: filters?.sort,
			})
			.then((project) => project.map(ProjectOutDTO));

		return PaginationDTO(projects, pagination.metadata);
	}
}
