import type { ITech, TechEntity } from '@/server/domain/entities/tech';

export interface ITechQuery {
	search?: string;
	skip?: number;
	limit?: number;
	orderBy?: string;
	sort?: 'asc' | 'desc';
}

export interface ITechRepository {
	getTechs(query?: ITechQuery): Promise<TechEntity[]>;
	getRowCount(query?: ITechQuery): Promise<number>;
	getTech(
		field: Partial<Pick<ITech, 'id' | 'name' | 'logoUrl'>>
	): Promise<TechEntity | null>;
	getDuplicateTech(
		field: Partial<Pick<ITech, 'name' | 'logoUrl'>>,
		techId?: string
	): Promise<TechEntity[] | null>;
	createTech(tech: TechEntity): Promise<TechEntity>;
	updateTech(tech: TechEntity): Promise<TechEntity>;
	deleteMany(ids: string[]): Promise<void>;
}
