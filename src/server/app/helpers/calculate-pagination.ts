import type { IPaginationMetadata } from '../dtos/pagination';

import { GeneralAppError } from '../errors/app-error';

/**
 * Calculates pagination metadata and skip value based on total data, limit, and current page.
 *
 * @param totalData
 * @param limit
 * @param currentPage
 *
 * @throws {GeneralAppError.BiggerPageIndex} If the current page exceeds the total number of pages.
 *
 * @returns metadata and skip value for pagination.
 */
export function calculatePagination(
	totalData: number,
	limit: number = 10,
	currentPage: number = 1
): {
	metadata: IPaginationMetadata;
	skip?: number;
} {
	const totalPage = Math.ceil(totalData / limit);

	if (currentPage && totalPage && currentPage > totalPage) {
		throw new GeneralAppError.BiggerPageIndex();
	}

	return {
		metadata: {
			total: totalData,
			page: currentPage,
			limit,
			pages: totalPage,
		},
		skip: currentPage ? (currentPage - 1) * limit : undefined,
	};
}
