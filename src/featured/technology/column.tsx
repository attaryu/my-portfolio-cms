import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { IFailResponse } from '@/server/presentation/http/types/response';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { AxiosError } from 'axios';
import { Ellipsis } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortingHeader } from '@/featured/data-table/components/sorting-header';

import { axiosDelete } from '@/lib/axios/actions/delete';
import { formatDate } from '@/lib/date';
import { del } from '@/lib/file-storage';

export const technologyColumns: ColumnDef<ITechOutDTO>[] = [
	{
		id: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && 'indeterminate')
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'id',
		header: 'Id',
		enableSorting: false,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => <SortingHeader column={column}>Name</SortingHeader>,
	},
	{
		accessorKey: 'logo_url',
		header: 'Logo',
		cell: ({ row }) => (
			<Image
				src={row.getValue('logo_url')}
				alt={row.getValue('name')}
				width={48}
				height={48}
				className="size-12 p-1"
			/>
		),
		enableSorting: false,
	},
	{
		id: 'created_at',
		accessorKey: 'created_at',
		header: ({ column }) => (
			<SortingHeader column={column}>Created At</SortingHeader>
		),
		cell: ({ row }) => formatDate(row.getValue('created_at')),
	},
	{
		accessorKey: 'updated_at',
		header: ({ column }) => (
			<SortingHeader column={column}>Updated At</SortingHeader>
		),
		cell: ({ row }) => formatDate(row.getValue('updated_at')),
	},
	{
		header: 'Actions',
		cell: ({ row }) => {
			const queryClient = useQueryClient();
			const [open, setOpen] = useState(false);
			const [loading, setLoading] = useState(false);

			const id = row.getValue('id');

			const mutation = useMutation({
				mutationFn: () => axiosDelete(`/techs/${id}`),
				onSuccess: async (response) => {
					// delete logo from storage
					try {
						await del(row.getValue('logo_url'));
					} catch (error) {
						toast.error((error as Error).message);
					}

					queryClient.invalidateQueries({ queryKey: ['technology', 'all'] });
					toast.success(response.message);

					setOpen(false);
					setLoading(false);
				},
				onError: (error) => {
					if (error instanceof AxiosError) {
						const response: IFailResponse = error.response?.data;
						toast.error(response.message);
					}
				},
			});

			return (
				<>
					{/* dropdown menu */}
					<ActionDropdown disabled={loading || row.getIsSelected()}>
						<DropdownMenuItem asChild>
							<Link href={`/technologies/${id}/edit`}>Edit</Link>
						</DropdownMenuItem>

						<DropdownMenuItem
							variant="destructive"
							onClick={() => setOpen(true)}
						>
							Delete
						</DropdownMenuItem>
					</ActionDropdown>

					{/* delete confirmation dialog */}
					<AlertDialog open={open} onOpenChange={setOpen}>
						<AlertDialogPortal>
							<AlertDialogOverlay />

							<AlertDialogContent>
								<AlertDialogHeader>
									<AlertDialogTitle>Confirm Deletion</AlertDialogTitle>

									<AlertDialogDescription>
										Are you sure you want to delete this data?
									</AlertDialogDescription>
								</AlertDialogHeader>

								<AlertDialogFooter>
									<AlertDialogCancel disabled={loading}>
										Cancel
									</AlertDialogCancel>

									<Button
										variant="destructive"
										onClick={() => mutation.mutate()}
										disabled={loading}
									>
										Confirm
									</Button>
								</AlertDialogFooter>
							</AlertDialogContent>
						</AlertDialogPortal>
					</AlertDialog>
				</>
			);
		},
		enableSorting: false,
		enableHiding: false,
	},
];

type Props = {
	children: React.ReactNode;
	disabled?: boolean;
};

function ActionDropdown({ children, disabled }: Props) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild disabled={disabled}>
				<Button variant="outline" size="icon">
					<Ellipsis />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuPortal>
				<DropdownMenuContent>{children}</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
}
