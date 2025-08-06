import type { ITech, TechEntity } from '@/server/domain/entities/tech';
import type { IQuery } from '../dtos/query';

export interface ITechRepository {
	getTechs(query?: IQuery): Promise<TechEntity[]>;
	getRowCount(query?: IQuery): Promise<number>;
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
