import type { ITechOut } from '@/server/app/dtos/tech/out';
import type { IPagination } from '../../dtos/pagination';

export interface IFilterTechs {
	page?: number;
	limit?: number;
	search?: string;
	orderBy?: {
		field: string;
		direction: 'asc' | 'desc';
	};
}

export interface IGetAllTechsUseCase {
	execute(filters?: IFilterTechs): Promise<IPagination<ITechOut>>;
}
