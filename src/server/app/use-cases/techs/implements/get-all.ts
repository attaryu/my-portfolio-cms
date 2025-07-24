import type { IPagination } from '@/server/app/dtos/pagination';
import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { IFilterTechs, IGetAllTechsUseCase } from '../get-all';

import { TechUseCaseErrors } from '@/server/app/errors/use-cases/tech';

export class GetAllTechsUseCase implements IGetAllTechsUseCase {
	constructor(private readonly techRepository: ITechRepository) {}

	async execute(filters?: IFilterTechs): Promise<IPagination<ITechOut>> {
		const search = filters?.search?.trim().toLowerCase();

		const total = await this.techRepository.getRowCount({ search });
		const pages = Math.ceil(total / (filters?.limit ?? 10));

		if (filters?.page && filters.page > pages) {
			throw new TechUseCaseErrors.BiggerPageIndex();
		}

		const techs = await this.techRepository.getTechs({
			search,
			skip: filters?.page
				? (filters.page - 1) * (filters.limit ?? 10)
				: undefined,
			limit: filters?.limit ?? 10,
			orderBy: filters?.order,
			sort: filters?.sort,
		});

		return {
			data: techs.map((tech) => ({
				id: tech.id!,
				name: tech.name,
				logo_url: tech.logoUrl,
				created_at: tech.createdAt!.toISOString(),
				updated_at: tech.updatedAt!.toISOString(),
			})),
			pagination: {
				total,
				page: filters?.page ?? 1,
				limit: filters?.limit ?? 10,
				pages,
			},
		};
	}
}
