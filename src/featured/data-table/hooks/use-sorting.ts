import type { OnChangeFn, SortingState } from '@tanstack/react-table';

import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

export function useSorting() {
	const [sort, setSort] = useQueryState('sort');
	const [order, setOrder] = useQueryState('order');

	const sorting: SortingState = useMemo(
		() => (sort && order ? [{ id: order, desc: sort === 'desc' }] : []),
		[sort, order]
	);

	const onSortingChange: OnChangeFn<SortingState> = (updater) => {
		const newSorting =
			typeof updater === 'function' ? updater(sorting) : updater;

		if (newSorting && newSorting.length > 0) {
			const { id, desc } = newSorting[0];

			setOrder(id);
			setSort(desc ? 'desc' : 'asc');
		} else {
			setSort(null);
			setOrder(null);
		}
	};

	return {
		sorting,
		onSortingChange,
	};
}
