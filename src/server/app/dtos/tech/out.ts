import { TechEntity } from '@/server/domain/entities/tech';

export interface ITechOutDTO {
	id: string;
	name: string;
	logo_url: string;
	created_at: string;
	updated_at: string;
}

export const TechOutDTO = (tech: TechEntity): ITechOutDTO => ({
	id: tech.id!,
	name: tech.name,
	logo_url: tech.logoUrl,
	created_at: tech.createdAt!.toISOString(),
	updated_at: tech.updatedAt!.toISOString(),
});
