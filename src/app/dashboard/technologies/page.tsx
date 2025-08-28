'use client';

import type { ITechOutDTO } from '@/server/app/dtos/tech/out';

import type { IFailResponse } from '@/server/presentation/http/types/response';

import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import {
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	Columns2,
	Plus,
	Trash,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	AlertDialogPortal,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Text from '@/components/ui/text';
import { Loader } from '@/featured/dashboard/components/loader';
import { DataTable } from '@/featured/data-table';
import { SearchInput } from '@/featured/data-table/components/search-input';

import { technologyColumns } from '@/featured/technology/column';

import { useVisibilityColumn } from '@/featured/data-table/hooks/use-column-visibility';
import { usePagination } from '@/featured/data-table/hooks/use-pagination';
import { useSorting } from '@/featured/data-table/hooks/use-sorting';

import { axiosDelete } from '@/lib/axios/actions/delete';
import { axiosGet } from '@/lib/axios/actions/get';
import { del } from '@/lib/file-storage';

type MutationPayload = {
	techIds: string[];
};

export default function AllTechnologiesPage() {
	const searchParams = useSearchParams();
	const [openDialog, setOpenDialog] = useState(false);

	const query = useQuery({
		queryKey: ['technology', 'list', searchParams.toString()],
		queryFn: () =>
			axiosGet<{ techs: ITechOutDTO[] }>(
				'/techs' + (searchParams.size ? `?${searchParams.toString()}` : '')
			),
		placeholderData: keepPreviousData,
		staleTime: 5000,
		retry: 2,
	});

	const [rowSelection, onRowSelectionChange] = useState({});
	const { sorting, onSortingChange } = useSorting();
	const { columnVisibility, onColumnVisibilityChange } =
		useVisibilityColumn('tech-visibility');
	const { pagination, onPaginationChange } = usePagination();

	const multipleDelete = useMutation({
		mutationFn: async ({
			data,
			blobUrls,
		}: {
			data: MutationPayload;
			blobUrls: string[];
		}) => {
			try {
				const response = await axiosDelete('/techs', data);

				if (response.status === 'success') {
					try {
						for (const url of blobUrls) {
							await del(url);
						}
					} catch (error) {
						console.error(error);
						toast.error(
							'Failed to delete some logos from storage, see console for more details.'
						);
					}
				}

				return response;
			} catch (error) {
				throw error;
			}
		},
		onSuccess: (response) => {
			setOpenDialog(false);
			onRowSelectionChange({});
			query.refetch();
			toast.success(response.message);
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				const response: IFailResponse = error.response?.data;
				toast.error(response.message);
			} else {
				console.error(error);
				toast.error(
					'An unexpected error occurred, see console for more details.'
				);
			}
		},
	});

	const table = useReactTable({
		data: query.data?.data?.techs ?? [],
		columns: technologyColumns,
		getCoreRowModel: getCoreRowModel(),
		onRowSelectionChange,
		onColumnVisibilityChange,
		onSortingChange,
		onPaginationChange,
		pageCount: query.data?.pagination?.pages,
		rowCount: query.data?.pagination?.total,
		manualSorting: true,
		manualPagination: true,
		getRowId: (originalRow) => originalRow.id,
		state: {
			sorting,
			rowSelection,
			columnVisibility,
			pagination,
		},
	});

	async function multipleDeleteHandler() {
		const techIds = Object.keys(rowSelection);

		multipleDelete.mutate({
			data: { techIds },
			blobUrls: techIds.map((id) => table.getRow(id).original.logo_url),
		});
	}

	return (
		<>
			{/* main content */}
			<main className="py-10">
				<Text tag="h1">Technologies</Text>

				<div className="flex gap-2 mb-8 mt-6 items-end sticky top-6 bg-background z-10 rounded-lg w-full">
					{/* delete selected row button */}
					<Button
						variant="destructive"
						className="mr-auto"
						disabled={
							!(
								table.getIsSomePageRowsSelected() ||
								table.getIsAllPageRowsSelected()
							) || query.isPending
						}
						onClick={() => setOpenDialog(true)}
					>
						<Trash /> Multiple
					</Button>

					{/* visibility column dropdown */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="outline">
								<Columns2 /> Columns
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuPortal>
							<DropdownMenuContent>
								{table
									.getAllColumns()
									.filter((column) => column.getCanHide())
									.map((column) => (
										<DropdownMenuCheckboxItem
											key={column.id}
											className="capitalize"
											checked={column.getIsVisible()}
											onCheckedChange={(value) =>
												column.toggleVisibility(!!value)
											}
										>
											{column.id.replaceAll('_', ' ')}
										</DropdownMenuCheckboxItem>
									))}
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>

					{/* previous page button */}
					<Button
						variant="outline"
						disabled={
							query.isPending || !table.getCanPreviousPage() || query.isError
						}
						onClick={table.previousPage}
					>
						<ChevronLeft />
						Previous
					</Button>

					{/* select page */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								disabled={query.isPending || query.isError}
								variant="outline"
							>
								Page {query.data?.pagination?.page} <ChevronDown />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuPortal>
							<DropdownMenuContent>
								{Array.from(
									{ length: query.data?.pagination!.pages ?? 0 },
									(_, i) => (
										<DropdownMenuItem
											key={i}
											disabled={query.isPending || pagination.pageIndex === i}
											onClick={() => table.setPageIndex(i)}
										>
											Page {i + 1}
										</DropdownMenuItem>
									)
								)}
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>

					{/* next page button */}
					<Button
						variant="outline"
						disabled={
							query.isPending || !table.getCanNextPage() || query.isError
						}
						onClick={table.nextPage}
					>
						Next <ChevronRight />
					</Button>

					{/* page size */}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								disabled={query.isPending || query.isError}
								variant="outline"
							>
								Show {pagination.pageSize} Data <ChevronDown />
							</Button>
						</DropdownMenuTrigger>

						<DropdownMenuPortal>
							<DropdownMenuContent>
								{[5, 10, 15, 20, 25, 30].map((i) => (
									<DropdownMenuItem
										key={i}
										disabled={query.isPending || i === pagination.pageSize}
										onClick={() => table.setPageSize(i)}
									>
										{i} Data
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenuPortal>
					</DropdownMenu>

					<SearchInput disabled={query.isPending || query.isError} />

					<Button asChild>
						<Link href="/dashboard/technologies/create">
							<Plus /> Add
						</Link>
					</Button>
				</div>

				<div>
					{query.isPending ? (
						<div className="w-full h-[400px] grid place-items-center border rounded-md">
							<Loader />
						</div>
					) : (
						<DataTable table={table} columns={technologyColumns} />
					)}
				</div>
			</main>

			<AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
				<AlertDialogPortal>
					<AlertDialogOverlay />

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Multiple delete confirmation.</AlertDialogTitle>

							<AlertDialogDescription>
								Are you sure you want to delete these data?
							</AlertDialogDescription>
						</AlertDialogHeader>

						<AlertDialogFooter>
							<AlertDialogCancel disabled={multipleDelete.isPending}>
								Cancel
							</AlertDialogCancel>

							<Button
								variant="destructive"
								onClick={multipleDeleteHandler}
								disabled={multipleDelete.isPending}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogPortal>
			</AlertDialog>
		</>
	);
}
