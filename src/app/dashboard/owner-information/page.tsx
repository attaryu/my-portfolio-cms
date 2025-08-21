'use client';

import type { IOwnerPublicInfoOutDTO } from '@/server/app/dtos/owner/public-info-out';

import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
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
import { Textarea } from '@/components/ui/textarea';
import { ImagePreview } from '@/featured/dashboard/components/image-preview';
import { DashboardFormLabel } from '@/featured/dashboard/components/label';
import { Loader } from '@/featured/dashboard/components/loader';
import { useImagePreview } from '@/featured/dashboard/hooks/use-image-preview';

import { FieldRow } from '@/featured/dashboard/layouts/two-field-row';

import { axiosGet } from '@/lib/axios/actions/get';
import { axiosPut } from '@/lib/axios/actions/put';
import { del, upload } from '@/lib/file-storage';
import { ArrayField } from './array-field';

interface FormValue {
	contact_email: string;
	address: string;
	cover_image: FileList | null;
	about: string;
	social_media: {
		name: string;
		url: string;
	}[];
}

interface MutationPayload {
	contact_email: string;
	address: string;
	cover_url: string;
	about: string;
	social_media: {
		name: string;
		url: string;
	}[];
}

type ResponseData = { owner: IOwnerPublicInfoOutDTO };

const formId = 'owner-information-form';

export default function OwnerInformationPage() {
	const form = useForm<FormValue>();
	const [loading, setLoading] = useState(false);
	const imagePreview = useImagePreview();

	const query = useQuery({
		queryKey: ['owner', 'public-info'],
		queryFn: () => axiosGet<ResponseData>('/owner/public-info'),
	});

	const mutation = useMutation({
		mutationFn: (data: MutationPayload) =>
			axiosPut<MutationPayload, ResponseData>('/owner/public-info', data),
		onSuccess: (response) => {
			form.reset({
				address: response.data!.owner.address,
				contact_email: response.data!.owner.contact_email,
				social_media: response.data!.owner.social_media,
				about: response.data!.owner.about,
				cover_image: null,
			});

			imagePreview.setDefault(response.data!.owner.cover_url);

			toast.success(response.message);
		},
	});

	const disabled = loading || mutation.isPending;

	useEffect(() => {
		if (query.data) {
			form.setValue('social_media', query.data.data!.owner.social_media);
			imagePreview.setDefault(query.data.data!.owner.cover_url);
		}
	}, [query.data]);

	const onSubmit = form.handleSubmit(async (data) => {
		setLoading(true);

		try {
			let url: string = query.data?.data?.owner.cover_url ?? '';

			if (data.cover_image && data.cover_image.length) {
				const file = data.cover_image[0];
				const cover = await upload(`/public/homepage/${file.name}`, file);

				if (url) {
					await del(url);
				}

				url = cover.url;
			}

			mutation.mutate({
				...data,
				cover_url: url,
			});
		} catch (error) {
			toast.error((error as Error).message);
		} finally {
			setLoading(false);
		}
	});

	function onReset() {
		form.setValue('social_media', query.data!.data!.owner.social_media);
		form.clearErrors();
		imagePreview.reset();
	}

	if (query.isPending) {
		return (
			<main className="sidebar-inner-content-fit grid place-items-center">
				<Loader />
			</main>
		);
	}

	if (query.isError) {
		return (
			<main className="sidebar-inner-content-fit flex justify-center items-center gap-2 flex-col">
				<Text tag="h1">Error</Text>
				<Text>
					{query.error instanceof AxiosError
						? query.error.response?.data.message
						: query.error.message}
				</Text>
			</main>
		);
	}

	return (
		<main className="sidebar-inner-content-fit grid place-items-center">
			<Card className="w-3xl">
				<CardHeader>
					<Text tag="h1" styling="h2">
						Owner Public Information
					</Text>
				</CardHeader>

				<CardContent>
					<form
						className="space-y-6"
						id={formId}
						onSubmit={onSubmit}
						onReset={onReset}
					>
						{/* email & address */}
						<FieldRow>
							{/* email */}
							<DashboardFormLabel
								htmlFor="contact-email"
								label="Contact Email"
								errorMessage={form.formState.errors.contact_email?.message}
							>
								<Input
									type="email"
									id="contact-email"
									placeholder="example@mail.com"
									defaultValue={query.data.data?.owner.contact_email}
									{...form.register('contact_email', {
										disabled,
										required: 'Email is required',
										minLength: {
											value: 5,
											message: 'Email must be at least 5 characters long',
										},
										maxLength: {
											value: 100,
											message: 'Email must be at most 100 characters long',
										},
										value: query.data?.data?.owner.contact_email,
									})}
								/>
							</DashboardFormLabel>

							{/* address */}
							<DashboardFormLabel
								htmlFor="address"
								label="Address"
								errorMessage={form.formState.errors.address?.message}
							>
								<Input
									type="text"
									id="address"
									placeholder="Jombang, East Java"
									defaultValue={query.data.data?.owner.address}
									{...form.register('address', {
										disabled,
										required: 'Address is required',
										minLength: {
											value: 10,
											message: 'Address must be at least 10 characters long',
										},
										maxLength: {
											value: 100,
											message: 'Address must be at most 100 characters long',
										},
										value: query.data?.data?.owner.address,
									})}
								/>
							</DashboardFormLabel>
						</FieldRow>

						{/* about */}
						<DashboardFormLabel
							htmlFor="about"
							label="About"
							errorMessage={form.formState.errors.about?.message}
						>
							<Textarea
								id="about"
								placeholder="About you"
								defaultValue={query.data?.data?.owner.about}
								{...form.register('about', {
									disabled,
									required: 'About is required',
									minLength: {
										value: 10,
										message: 'About must be at least 10 characters long',
									},
									maxLength: {
										value: 500,
										message: 'About must be at most 500 characters long',
									},
									value: query.data?.data?.owner.about,
								})}
							/>
						</DashboardFormLabel>

						{/* cover image input */}
						<div className="space-y-4">
							<DashboardFormLabel
								htmlFor="cover-url"
								label="Cover"
								errorMessage={form.formState.errors.cover_image?.message}
							>
								<Input
									type="file"
									id="cover-url"
									{...form.register('cover_image', {
										disabled,
										required: !query.data.data!.owner.cover_url,
										maxLength: {
											value: 1,
											message: 'Cover image must be a single file',
										},
										onChange: imagePreview.inputHandler,
									})}
								/>
							</DashboardFormLabel>

							<ImagePreview src={imagePreview.url} />
						</div>

						<ArrayField
							control={form.control}
							name="social_media"
							maxLength={5}
							minLength={1}
							appendItem={{ name: '', url: '' }}
							addFieldButton={({ addFieldHandler, isDisabled }) => (
								<div className="flex justify-center gap-4 items-center">
									<Text styling="small">Add more social media link</Text>

									<Button
										type="button"
										variant="outline"
										size="icon"
										onClick={addFieldHandler}
										disabled={disabled || isDisabled}
									>
										<Plus />
									</Button>
								</div>
							)}
							fieldRender={({
								field,
								index,
								deleteFieldHandler,
								isDisabled,
							}) => (
								<div key={field.id} className="flex gap-4 items-end w-full">
									<FieldRow>
										{/* name input */}
										<DashboardFormLabel
											key={field.id}
											htmlFor={`social_media.${field.id}.name`}
											label="Name"
											errorMessage={
												form.formState.errors.social_media?.[index]?.name
													?.message
											}
										>
											<Input
												id={`social_media.${field.id}.name`}
												type="text"
												placeholder="Social Media Name"
												defaultValue={field.name}
												{...form.register(`social_media.${index}.name`, {
													disabled,
													required: 'Name is required',
													minLength: {
														value: 2,
														message: 'Name must be at least 2 characters long',
													},
													maxLength: {
														value: 100,
														message: 'Name must be at most 100 characters long',
													},
												})}
											/>
										</DashboardFormLabel>

										{/* url input */}
										<DashboardFormLabel
											htmlFor={`social_media.${field.id}.url`}
											label="URL"
											errorMessage={
												form.formState.errors.social_media?.[index]?.url
													?.message
											}
										>
											<div className="flex gap-4">
												<Input
													type="url"
													id={`social_media.${field.id}.url`}
													placeholder="Social Media URL"
													defaultValue={field.url}
													{...form.register(`social_media.${index}.url`, {
														disabled,
														required: 'URL is required',
													})}
												/>

												{/* delete list button */}
												<Button
													type="button"
													variant="destructive"
													size="icon"
													onClick={deleteFieldHandler}
													disabled={disabled || isDisabled}
												>
													<X />
												</Button>
											</div>
										</DashboardFormLabel>
									</FieldRow>
								</div>
							)}
						/>

						<div className="space-y-6">
							{/* social media list */}

							{/* add social media link button */}
						</div>
					</form>
				</CardContent>

				<CardFooter className="flex gap-4 *:grow">
					<Button
						type="reset"
						variant="outline"
						form={formId}
						disabled={disabled}
					>
						Reset
					</Button>

					<Button type="submit" form={formId} disabled={disabled}>
						Submit
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
