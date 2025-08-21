'use client';

import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
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
import { DashboardFormLabel } from '@/featured/dashboard/components/label';
import { FieldRow } from '@/featured/dashboard/layouts/two-field-row';

import { IFailResponse } from '@/server/presentation/http/types/response';

import { axiosPatch } from '@/lib/axios/actions/patch';

type FormValues = {
	email?: string;
	current_password?: string;
	new_password?: string;
	repeat_new_password?: string;
};

const formId = 'change-login-credential-form';

export default function ChangeLoginCredentialPage() {
	const router = useRouter();
	const form = useForm<FormValues>();

	const mutation = useMutation({
		mutationFn: (data: FormValues) => axiosPatch('/owner/credential', data),
		onSuccess: () => {
			router.push('/login');
			toast.success('Success, please login again');
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				const data: IFailResponse = error.response!.data;

				if (data.error) {
					for (const [key, value] of Object.entries(data.error)) {
						form.setError(key as keyof FormValues, {
							message: value[0],
						});
					}
				}

				toast.error(data.message);
			}
		},
	});

	const onSubmit = form.handleSubmit((data) => {
		const { new_password, repeat_new_password } = data;

		if (
			new_password &&
			repeat_new_password &&
			new_password !== repeat_new_password
		) {
			form.setError('repeat_new_password', {
				message: 'New password and repeat new password must match',
			});

			return;
		}

		const sanitizedData: Record<string, any> = {};

		for (const key in data) {
			if (data[key as keyof FormValues]) {
				sanitizedData[key] = data[key as keyof FormValues];
			}
		}

		mutation.mutate(sanitizedData);
	});

	return (
		<main className="sidebar-inner-content-fit grid place-items-center">
			<Card className="min-w-sm w-fit max-w-lg">
				<CardHeader>
					<Text tag="h1" styling="h2" className="pb-0">
						Change Login Credential
					</Text>

					<Text styling="muted">
						Leave some fields empty if you don't want to change them.
					</Text>
				</CardHeader>

				<CardContent>
					<form className="space-y-6" onSubmit={onSubmit} id={formId}>
						<DashboardFormLabel
							htmlFor="email"
							label="New email"
							errorMessage={form.formState.errors.email?.message}
						>
							<Input
								type="email"
								placeholder="example@mail.com"
								id="email"
								{...form.register('email', {
									minLength: {
										value: 4,
										message: 'Email must be at least 4 characters long',
									},
									maxLength: {
										value: 150,
										message: 'Email must be at most 150 characters long',
									},
									disabled: mutation.isPending,
								})}
							/>
						</DashboardFormLabel>

						<Text styling="muted">
							All password fields are required if you want to change them.
						</Text>

						<DashboardFormLabel
							htmlFor="current-password"
							label="Current password"
							errorMessage={form.formState.errors.current_password?.message}
						>
							<Input
								type="password"
								id="current-password"
								{...form.register('current_password', {
									minLength: {
										value: 4,
										message:
											'Current password must be at least 4 characters long',
									},
									maxLength: {
										value: 100,
										message:
											'Current password must be at most 100 characters long',
									},
									disabled: mutation.isPending,
								})}
							/>
						</DashboardFormLabel>

						<FieldRow>
							<DashboardFormLabel
								htmlFor="new-password"
								label="New password"
								errorMessage={form.formState.errors.new_password?.message}
							>
								<Input
									type="password"
									id="new-password"
									{...form.register('new_password', {
										minLength: {
											value: 4,
											message:
												'New password must be at least 4 characters long',
										},
										maxLength: {
											value: 100,
											message:
												'New password must be at most 100 characters long',
										},
										disabled: mutation.isPending,
									})}
								/>
							</DashboardFormLabel>

							<DashboardFormLabel
								htmlFor="repeat-new-password"
								label="Repeat new password"
								errorMessage={
									form.formState.errors.repeat_new_password?.message
								}
							>
								<Input
									type="password"
									id="repeat-new-password"
									{...form.register('repeat_new_password', {
										minLength: {
											value: 4,
											message:
												'Repeat new password must be at least 4 characters long',
										},
										maxLength: {
											value: 100,
											message:
												'Repeat new password must be at most 100 characters long',
										},
										disabled: mutation.isPending,
									})}
								/>
							</DashboardFormLabel>
						</FieldRow>
					</form>
				</CardContent>

				<CardFooter className="flex gap-2 *:grow">
					<Button
						type="reset"
						variant="outline"
						form={formId}
						disabled={mutation.isPending}
					>
						Reset
					</Button>

					<Button type="submit" form={formId} disabled={mutation.isPending}>
						Submit
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
