import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { IPagination } from '../../dtos/pagination';

export interface IFilterTechs {
	page?: number;
	limit?: number;
	search?: string;
	order?: string;
	sort?: 'asc' | 'desc';
}

export interface IGetAllTechsUseCase {
	execute(filters?: IFilterTechs): Promise<IPagination<ITechOut>>;
}
