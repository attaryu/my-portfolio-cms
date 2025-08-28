import { VisibilityState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export function useVisibilityColumn(cacheKey: string) {
	const [columnVisibility, onColumnVisibilityChange] =
		useState<VisibilityState>(() => {
			if (typeof window !== 'undefined') {
				const cachedVisibility = localStorage.getItem(cacheKey);

				try {
					return cachedVisibility ? JSON.parse(cachedVisibility) : {};
				} catch {
					localStorage.removeItem(cacheKey);
				}
			}

			return {};
		});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (Object.keys(columnVisibility).length) {
				try {
					localStorage.setItem(cacheKey, JSON.stringify(columnVisibility));
				} catch {
					localStorage.removeItem(cacheKey);
				}
			}
		}
	}, [columnVisibility, cacheKey]);

	return {
		columnVisibility,
		onColumnVisibilityChange,
	};
}
