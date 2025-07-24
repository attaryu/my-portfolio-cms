export interface IPagination<Type> {
	data: Type[];
	pagination: {
		total: number;
		page: number;
		limit: number;
		pages: number;
	};
}
