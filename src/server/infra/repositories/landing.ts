import type { ILandingOutDTO } from '@/server/app/dtos/landing/out';
import type { ILandingRepository } from '@/server/app/repositories/landing';
import type { PrismaClient } from '../databases/prisma/generated';

export class LandingRepository implements ILandingRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async getLanding(): Promise<ILandingOutDTO | null> {
		const data = await this.prisma.owner.findFirst({
			orderBy: { created_at: 'asc' },
			select: {
				email: true,
				address: true,
				cover_url: true,
				about: true,
				updated_at: true,
				social_media: {
					select: {
						id: true,
						name: true,
						url: true,
					},
				},
				top_projects: {
					select: {
						project: {
							select: {
								id: true,
								title: true,
								short_description: true,
								cover_url: true,
								created_at: true,
								main_link: {
									select: {
										id: true,
										url: true,
										type: true,
									},
								},
								techs: {
									select: {
										tech: {
											select: {
												name: true,
											},
										},
									},
								},
							},
						},
					},
				},
			},
		});

		return data
			? {
					email: data.email,
					address: data.address,
					cover_url: data.cover_url,
					about: data.about,
					social_media: data.social_media,
					updated_at: data.updated_at,
					top_project: data.top_projects.map(({ project }) => ({
						id: project.id,
						title: project.title,
						cover_url: project.cover_url,
						short_description: project.short_description,
						created_at: project.created_at,
						main_links: project.main_link,
						techs: project.techs.map(({ tech }) => tech.name),
					})),
			  }
			: null;
	}
}
