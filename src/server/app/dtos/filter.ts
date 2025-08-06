export interface IFilterDTO {
	page?: number;
	limit?: number;
	search?: string;
	order?: string;
	sort?: 'asc' | 'desc';
}
