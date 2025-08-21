'use client';

import type { IFailResponse } from '@/server/presentation/http/types/response';

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
import { storeAccessToken } from '@/lib/access-token';
import { axiosPost } from '@/lib/axios';

const formId = 'login-form';

interface LoginFormValues {
	email: string;
	password: string;
}

export default function LoginClientPage() {
	const { handleSubmit, register, formState, setError } =
		useForm<LoginFormValues>();
	const router = useRouter();

	const ownerLoginMutation = useMutation({
		mutationFn: (data: LoginFormValues) =>
			axiosPost<{ access_token: string }>('/owner/login', data),
		onSuccess: (response) => {
			router.push('/dashboard');
			toast.success(response.message);
			storeAccessToken(response.data!.access_token);
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				const data: IFailResponse = error.response!.data;

				if (data.error) {
					for (const [key, value] of Object.entries(data.error)) {
						setError(key as keyof LoginFormValues, {
							message: value,
						});
					}
				}

				toast.error(error.response?.data.message);
			}
		},
	});

	const onSubmit = handleSubmit((data) => {
		ownerLoginMutation.mutate(data);
	});

	return (
		<main className="grid place-items-center h-dvh">
			<Card className="w-96">
				<CardHeader>
					<Text tag="h1" styling="h2" className="pb-0">
						Login first!
					</Text>

					<Text styling="muted">It's my portfolio CMS dashboard</Text>
				</CardHeader>

				<CardContent>
					<form className="space-y-6" id={formId} onSubmit={onSubmit}>
						{/* email */}
						<DashboardFormLabel
							htmlFor="email"
							label="Email"
							errorMessage={formState.errors.email?.message}
						>
							<Input
								id="email"
								type="email"
								placeholder="example@mail.com"
								{...register('email', {
									required: 'Email is required',
									minLength: {
										value: 4,
										message: 'Email must be at least 4 characters long',
									},
									maxLength: {
										value: 150,
										message: 'Email must be at most 150 characters long',
									},
									disabled: ownerLoginMutation.isPending,
								})}
							/>
						</DashboardFormLabel>

						{/* password */}
						<DashboardFormLabel
							htmlFor="password"
							label="Password"
							errorMessage={formState.errors.password?.message}
						>
							<Input
								id="password"
								type="password"
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 4,
										message: 'Password must be at least 4 characters long',
									},
									maxLength: {
										value: 100,
										message: 'Password must be at most 100 characters long',
									},
									disabled: ownerLoginMutation.isPending,
								})}
							/>
						</DashboardFormLabel>
					</form>
				</CardContent>

				<CardFooter className="flex gap-2 *:grow">
					<Button
						type="reset"
						variant="outline"
						form={formId}
						disabled={ownerLoginMutation.isPending}
					>
						Reset
					</Button>

					<Button
						type="submit"
						form={formId}
						disabled={ownerLoginMutation.isPending}
					>
						Login
					</Button>
				</CardFooter>
			</Card>
		</main>
	);
}
