import type { Column } from '@tanstack/react-table';

import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react';

import { Button } from '../../../components/ui/button';

type Props<Data> = {
	children: React.ReactNode;
	column: Column<Data, unknown>;
};

export default function SortingHeader<Data>({ children, column }: Props<Data>) {
	const sorted = column.getIsSorted();

	return (
		<div className="flex items-center gap-2">
			<button
				className="flex gap-2 items-center hover:bg-background h-9 px-1 rounded-lg"
				onClick={() => column.toggleSorting(sorted === 'asc')}
			>
				{sorted === 'asc' ? (
					<ArrowUp size={16} />
				) : sorted === 'desc' ? (
					<ArrowDown size={16} />
				) : (
					<ArrowUpDown size={16} />
				)}

				{children}
			</button>

			{sorted && (
				<Button
					size="icon"
					variant="outline"
					className="size-8"
					onClick={() => column.clearSorting()}
				>
					<X />
				</Button>
			)}
		</div>
	);
}
