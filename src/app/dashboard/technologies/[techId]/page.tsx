'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Text from '@/components/ui/text';
import { ImagePreview } from '@/featured/dashboard/components/image-preview';
import { DashboardFormLabel } from '@/featured/dashboard/components/label';
import { Loader } from '@/featured/dashboard/components/loader';
import { useImagePreview } from '@/featured/dashboard/hooks/use-image-preview';
import { axiosGet } from '@/lib/axios/actions/get';
import { axiosPut } from '@/lib/axios/actions/put';
import { formatDate } from '@/lib/date';
import { del, upload } from '@/lib/file-storage';
import { createImageValidation } from '@/lib/react-hook-form-image-validation';
import { ITechOutDTO } from '@/server/app/dtos/tech/out';
import { IFailResponse } from '@/server/presentation/http/types/response';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { use, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
	params: Promise<{
		techId: string;
	}>;
};

type FormFields = {
	name: string;
	logo_url: FileList | null;
};

type TechnologyPayload = {
	name: string;
	logo_url: string;
};

type ResponseDataApi = {
	tech: ITechOutDTO;
};

const formId = 'technology-form';

export default function TechnologyDetailPage({ params }: Props) {
	const { techId } = use(params);
	const imagePreview = useImagePreview();
	const queryClient = useQueryClient();
	const form = useForm<FormFields>();
	const [editMode, setEditMode] = useQueryState(
		'edit',
		parseAsBoolean.withDefault(false)
	);

	const query = useQuery({
		queryKey: ['technology', 'detail', techId],
		queryFn: () => axiosGet<ResponseDataApi>(`/techs/${techId}`),
	});

	useEffect(() => {
		if (query.isSuccess) {
			imagePreview.setDefault(query.data.data!.tech.logo_url);
		}
	}, [query.data, query.isSuccess]);

	const mutation = useMutation({
		mutationFn: async (payload: { data: FormFields; oldData: ITechOutDTO }) => {
			const { logo_url, name } = payload.data;
			const oldLogoUrl = payload.oldData.logo_url;

			let newLogoUrl = oldLogoUrl;

			// upload new logo if provided
			if (logo_url && logo_url.length > 0) {
				try {
					const blob = await upload('/public/techs', logo_url[0]);
					newLogoUrl = blob.url;
				} catch (error) {
					throw new Error('Failed to upload new logo.');
				}
			}

			try {
				const response = await axiosPut<ResponseDataApi, TechnologyPayload>(
					`/techs/${techId}`,
					{ name, logo_url: newLogoUrl }
				);

				// delete old logo after update
				if (response.data?.tech.logo_url !== oldLogoUrl) {
					await del(oldLogoUrl);
				}

				return response;
			} catch (error) {
				// delete new logo if update failed
				if (newLogoUrl !== oldLogoUrl) {
					await del(newLogoUrl);
				}

				throw error;
			}
		},
		onSuccess: (response) => {
			queryClient.setQueryData(['technology', 'detail', techId], response);
			queryClient.invalidateQueries({ queryKey: ['technology', 'list'] });
			toast.success(response.message);
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				const response: IFailResponse = error.response?.data;

				if (response.error) {
					for (const [key, value] of Object.entries(response.error)) {
						form.setError(key as keyof FormFields, { message: value[0] });
					}
				}

				toast.error(response.message);
			} else {
				toast.error('An unknown error occurred');
			}
		},
	});

	const isDisabled = useMemo(
		() => mutation.isPending || !editMode,
		[mutation.isPending, editMode]
	);

	const handleSubmit = form.handleSubmit((data) => {
		if (query.isSuccess) {
			mutation.mutate({ data, oldData: query.data.data!.tech });
		}
	});

	if (query.isPending) {
		return (
			<div className="sidebar-inner-content-fit grid place-items-center">
				<Loader />
			</div>
		);
	}

	if (query.isError) {
		if (query.error instanceof AxiosError) {
			const response: IFailResponse = query.error.response?.data;

			if (response.status_code === 404) {
				return (
					<div className="sidebar-inner-content-fit grid place-items-center">
						<Text tag="h1">Technology not found</Text>
					</div>
				);
			}

			return (
				<div className="sidebar-inner-content-fit flex justify-center items-center gap-4 flex-col">
					<Text tag="h1">An Error Occurred</Text>
					<Text>{response.message}</Text>
				</div>
			);
		}

		return (
			<div className="sidebar-inner-content-fit grid place-items-center">
				<Text tag="h1">Unknown error occurred</Text>
			</div>
		);
	}

	return (
		<main className="grid place-items-center">
			<Card className="w-xl">
				<CardHeader>
					<div className="flex justify-between">
						<Text tag="h1" styling="h2">
							Technology Details
						</Text>

						<div className="flex flex-col gap-1 items-end">
							<Text tag="small" styling="muted">
								Created at: {formatDate(query.data.data!.tech.created_at)}
							</Text>

							<Text tag="small" styling="muted">
								Updated at: {formatDate(query.data.data!.tech.updated_at)}
							</Text>
						</div>
					</div>
				</CardHeader>

				<CardContent>
					<form
						id={formId}
						className="space-y-6"
						onSubmit={handleSubmit}
						onReset={imagePreview.reset}
					>
						{/* name */}
						<DashboardFormLabel
							htmlFor="name"
							label="Name"
							errorMessage={form.formState.errors.name?.message}
						>
							<Input
								type="text"
								id="name"
								defaultValue={query.data.data?.tech.name}
								placeholder="Technology name"
								{...form.register('name', {
									required: 'Name is required',
									minLength: {
										value: 3,
										message: 'Name must be at least 3 characters long',
									},
									maxLength: {
										value: 32,
										message: 'Name must be at most 32 characters long',
									},
									disabled: isDisabled,
								})}
							/>
						</DashboardFormLabel>

						{/* logo */}
						<DashboardFormLabel
							htmlFor="logo"
							label="Logo"
							errorMessage={form.formState.errors.logo_url?.message}
						>
							<Input
								type="file"
								id="logo"
								{...form.register('logo_url', {
									required: {
										value: !query.data?.data?.tech.logo_url,
										message: 'Logo is required',
									},
									maxLength: {
										value: 1,
										message: 'Logo must be a single file',
									},
									onChange: imagePreview.inputHandler,
									validate: createImageValidation({
										maxSize: 2,
										acceptable: ['image/svg+xml'],
									}),
									disabled: isDisabled,
								})}
							/>
						</DashboardFormLabel>

						<ImagePreview src={imagePreview.url} />
					</form>
				</CardContent>

				<CardFooter className="flex *:grow gap-4">
					{editMode ? (
						<>
							<Button
								type="reset"
								variant="outline"
								form={formId}
								disabled={isDisabled}
								onClick={() => {
									form.reset();
									imagePreview.reset();
									setEditMode(false);
								}}
							>
								Cancel
							</Button>

							<Button type="submit" form={formId} disabled={isDisabled}>
								Submit
							</Button>
						</>
					) : (
						<Button onClick={() => setEditMode(true)}>Edit</Button>
					)}
				</CardFooter>
			</Card>
		</main>
	);
}
