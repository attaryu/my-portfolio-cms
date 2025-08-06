import type { IQuery } from '@/server/app/dtos/query';
import type { ITechRepository } from '@/server/app/repositories/tech';
import type { ITech } from '@/server/domain/entities/tech';
import type { PrismaClient, Techs } from '../databases/prisma/generated';

import { TechEntity } from '@/server/domain/entities/tech';

export class TechRepository implements ITechRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async getTechs(query?: IQuery): Promise<TechEntity[]> {
		const techs = await this.prisma.techs.findMany(this.queryBuilder(query));
		return techs.map((tech) => this.mapper(tech));
	}

	async getRowCount(query?: IQuery): Promise<number> {
		return await this.prisma.techs.count(this.queryBuilder(query));
	}

	async getTech(
		field: Partial<Pick<ITech, 'id' | 'name' | 'logoUrl'>>
	): Promise<TechEntity | null> {
		const tech = await this.prisma.techs.findFirst({
			where: {
				...field,
			},
		});

		return tech ? this.mapper(tech) : null;
	}

	async getDuplicateTech(
		field: Partial<Pick<ITech, 'name' | 'logoUrl'>>,
		techId?: string
	): Promise<TechEntity[] | null> {
		const techs = await this.prisma.techs.findMany({
			where: {
				NOT: { id: techId },
				OR: [
					{
						name: field.name,
					},
					{
						logo_url: field.logoUrl,
					},
				],
			},
		});

		return techs.length > 0 ? techs.map((tech) => this.mapper(tech)) : null;
	}

	async createTech(tech: TechEntity): Promise<TechEntity> {
		try {
			const createdTech = await this.prisma.techs.create({
				data: {
					name: tech.name,
					logo_url: tech.logoUrl,
				},
			});

			return this.mapper(createdTech);
		} catch (error) {
			throw error;
		}
	}

	async updateTech(tech: TechEntity): Promise<TechEntity> {
		const updatedTech = await this.prisma.techs.update({
			where: { id: tech.id! },
			data: {
				name: tech.name,
				logo_url: tech.logoUrl,
			},
		});

		return this.mapper(updatedTech);
	}

	async deleteMany(ids: string[]): Promise<void> {
		await this.prisma.techs.deleteMany({
			where: {
				id: { in: ids },
			},
		});
	}

	private queryBuilder(query?: IQuery) {
		return {
			skip: query?.skip,
			take: query?.limit,
			where: {
				...(query?.search ? { name: { contains: query?.search } } : undefined),
				...(query?.ids ? { id: { in: query.ids } } : undefined),
			},
			orderBy: {
				[query?.orderBy ?? 'updated_at']: query?.sort ?? 'desc',
			},
		};
	}

	private mapper(tech: Techs): TechEntity {
		return new TechEntity(
			tech.id,
			tech.name,
			tech.logo_url,
			tech.created_at,
			tech.updated_at
		);
	}
}
