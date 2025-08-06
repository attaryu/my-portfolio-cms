export interface IQuery {
	search?: string;
	skip?: number;
	limit?: number;
	orderBy?: string;
	ids?: string[];
	sort?: 'asc' | 'desc';
}
