export interface IPaginationMetadata {
	total: number;
	page: number;
	limit: number;
	pages: number;
}

export interface IPaginationDTO<Type> {
	data: Type[];
	pagination: IPaginationMetadata;
}

export const PaginationDTO = <Type>(
	data: Type[],
	metadata: IPaginationMetadata
): IPaginationDTO<Type> => ({
	data,
	pagination: {
		total: metadata.total,
		page: metadata.page,
		limit: metadata.limit,
		pages: metadata.pages,
	},
});
