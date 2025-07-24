import type {
	ITechQuery,
	ITechRepository,
} from '@/server/app/repositories/tech';
import type { PrismaClient } from '../databases/prisma/generated/prisma';

import { TechEntity } from '@/server/domain/entities/tech';

export class TechRepository implements ITechRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async getTechs(query?: ITechQuery): Promise<TechEntity[]> {
		const techs = await this.prisma.techs.findMany(this.queryBuilder(query));
		return techs.map((tech) => this.mapper(tech));
	}

	async getRowCount(query?: ITechQuery): Promise<number> {
		return await this.prisma.techs.count(this.queryBuilder(query));
	}

	private queryBuilder(query?: ITechQuery) {
		return {
			skip: query?.skip,
			take: query?.limit,
			where: {
				name: { contains: query?.search },
			},
			orderBy: {
				[query?.orderBy ?? 'updatedAt']: query?.sort ?? 'desc',
			},
		};
	}

	private mapper(tech: any): TechEntity {
		return new TechEntity(
			tech.id,
			tech.name,
			tech.logoUrl,
			tech.createdAt,
			tech.updatedAt
		);
	}
}
