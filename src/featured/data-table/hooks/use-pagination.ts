import type { OnChangeFn, PaginationState } from '@tanstack/react-table';

import { parseAsInteger, useQueryStates } from 'nuqs';
import { useMemo } from 'react';

export function usePagination() {
	const [paginationQuery, setPaginationQuery] = useQueryStates({
		page: parseAsInteger.withDefault(1),
		limit: parseAsInteger.withDefault(10),
	});

	const pagination = useMemo<PaginationState>(
		() => ({
			pageIndex: paginationQuery.page - 1,
			pageSize: paginationQuery.limit,
		}),
		[paginationQuery]
	);

	const onPaginationChange: OnChangeFn<PaginationState> = (updated) => {
		const { pageIndex, pageSize } =
			typeof updated === 'function' ? updated(pagination) : updated;

		setPaginationQuery({
			page: pageIndex + 1,
			limit: pageSize,
		});
	};

	return {
		pagination,
		onPaginationChange,
	};
}
