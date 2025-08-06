import type { IFilterDTO } from '@/server/app/dtos/filter';
import type { IPaginationDTO } from '@/server/app/dtos/pagination';
import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IGetAllTechsUseCase } from '../get-all';

import { PaginationDTO } from '@/server/app/dtos/pagination';
import { TechOutDTO } from '@/server/app/dtos/tech/out';
import { calculatePagination } from '@/server/app/helpers/calculate-pagination';

export class GetAllTechsUseCase implements IGetAllTechsUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(filters?: IFilterDTO): Promise<IPaginationDTO<ITechOutDTO>> {
		const search = filters?.search?.trim().toLowerCase();
		const total = await this.techRepository.getRowCount({ search });

		const pagination = calculatePagination(
			total,
			filters?.limit,
			filters?.page
		);

		const techs = await this.techRepository
			.getTechs({
				search,
				skip: pagination.skip,
				limit: pagination.metadata.limit,
				orderBy: filters?.order,
				sort: filters?.sort,
			})
			.then((techs) => techs.map(TechOutDTO));

		return PaginationDTO(techs, pagination.metadata);
	}
}
