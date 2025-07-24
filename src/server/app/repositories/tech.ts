import type { TechEntity } from '@/server/domain/entities/tech';

export interface ITechQuery {
	search?: string;
	skip?: number;
	limit?: number;
	orderBy?: {
		field: string;
		direction: 'asc' | 'desc';
	};
}

export interface ITechRepository {
	getTechs(query?: ITechQuery): Promise<TechEntity[]>;
	getRowCount(query?: ITechQuery): Promise<number>;
}
