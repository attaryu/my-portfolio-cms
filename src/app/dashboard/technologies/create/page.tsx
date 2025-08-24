'use client';

import type { ITechOutDTO } from '@/server/app/dtos/tech/out';
import type { IFailResponse } from '@/server/presentation/http/types/response';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

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

import { useImagePreview } from '@/featured/dashboard/hooks/use-image-preview';

import { axiosPost } from '@/lib/axios/actions/post';
import { del, upload } from '@/lib/file-storage';
import { createImageValidation } from '@/lib/react-hook-form-image-validation';

const formId = 'create-technology-form';

type FormValues = {
	name: string;
	logo_url: FileList;
};

type MutationPayload = {
	name: string;
	logo_url: string;
};

export default function CreateTechnologyPage() {
	const form = useForm<FormValues>();
	const [loading, setIsLoading] = useState(false);
	const imagePreview = useImagePreview();

	const mutation = useMutation({
		mutationFn: (data: MutationPayload) =>
			axiosPost<{ tech: ITechOutDTO }>('/techs', data),
		onSuccess: (response) => {
			toast.success(response.message);
			form.reset();
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				const response: IFailResponse = error.response?.data;

				if (response.error) {
					for (const [key, value] of Object.entries(response.error)) {
						form.setError(key as keyof FormValues, { message: value[0] });
					}
				}

				toast.error(response.message);
			} else {
				toast.error('An unexpected error occurred');
			}
		},
	});

	const handleSubmit = form.handleSubmit(async (data) => {
		setIsLoading(true);

		try {
			const blobLogo = await upload('/public/techs', data.logo_url[0]);

			mutation.mutate(
				{ ...data, logo_url: blobLogo.url },
				{ onError: () => del(blobLogo.url) }
			);
		} catch (error) {
			toast.error((error as Error).message);
		}

		setIsLoading(false);
	});

	return (
		<main className="grid place-items-center">
			<Card className="w-xl">
				<CardHeader>
					<Text tag="h1" styling="h2">
						Create Technology
					</Text>
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
									disabled: loading,
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
									required: 'Logo is required',
									maxLength: {
										value: 1,
										message: 'Logo must be a single file',
									},
									onChange: imagePreview.inputHandler,
									validate: createImageValidation({
										maxSize: 2,
										acceptable: ['image/svg+xml'],
									}),
									disabled: loading,
								})}
							/>
						</DashboardFormLabel>

						<ImagePreview src={imagePreview.url} />
					</form>
				</CardContent>

				<CardFooter className="flex *:grow gap-4">
					<Button
						type="reset"
						variant="outline"
						form={formId}
						disabled={loading}
					>
						Reset
					</Button>

					<Button type="submit" form={formId} disabled={loading}>
						Submit
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
