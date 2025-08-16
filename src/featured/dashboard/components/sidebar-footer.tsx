import { axiosPost } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ChevronUp, LaptopMinimal, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Text from '@/components/ui/text';

export function DashboardSidebarFooter() {
	const router = useRouter();

	const logoutMutation = useMutation({
		mutationFn: () => axiosPost('/owner/logout'),
		onSuccess: (data) => {
			localStorage.removeItem('ACCESS_TOKEN');
			router.push('/login');
			toast.success(data.message);
		},
		onError: (error) => {
			if (error instanceof AxiosError) {
				toast.error('Failed', {
					description: error.response?.data.message,
					action: {
						label: 'Retry',
						onClick: () => logoutMutation.mutate(),
					},
				});
			}
		},
	});

	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<SidebarMenuButton className="h-fit" variant="outline" asChild>
							<DropdownMenuTrigger>
								<Image
									src="/iroha.jpeg"
									alt=""
									width={40}
									height={40}
									className="rounded-md select-none"
								/>

								<div className="-space-y-0.5">
									<Text styling="large" className="text-base">
										M Attar
									</Text>

									<Text styling="muted" className="text-xs font-medium">
										Owner
									</Text>
								</div>

								<ChevronUp size={16} className="ml-auto" />
							</DropdownMenuTrigger>
						</SidebarMenuButton>

						<DropdownMenuContent side="top" className="w-48">
							<DropdownMenuGroup>
								{/* profile link */}
								<DropdownMenuItem asChild>
									<Link href="dashboard/profile">Profile</Link>
								</DropdownMenuItem>

								{/* theme selector */}
								<DropdownMenuSub>
									<DropdownMenuSubTrigger>Themes</DropdownMenuSubTrigger>

									<DropdownMenuPortal>
										<DropdownMenuSubContent>
											<DropdownMenuGroup className="space-y-1">
												<DropdownThemeItem value="dark">
													<Moon /> Dark
												</DropdownThemeItem>

												<DropdownThemeItem value="light">
													<Sun /> Light
												</DropdownThemeItem>

												<DropdownThemeItem value="system">
													<LaptopMinimal /> System
												</DropdownThemeItem>
											</DropdownMenuGroup>
										</DropdownMenuSubContent>
									</DropdownMenuPortal>
								</DropdownMenuSub>
							</DropdownMenuGroup>

							<DropdownMenuSeparator />

							{/* logout */}
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<button
										className="w-full"
										onClick={() => logoutMutation.mutate()}
									>
										<LogOut />
										Sign out
									</button>
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}

function DropdownThemeItem({
	value,
	children,
}: {
	value: string;
	children: React.ReactNode;
}) {
	const { theme, setTheme } = useTheme();

	return (
		<DropdownMenuItem
			onClick={() => setTheme(value)}
			disabled={theme === value}
		>
			{children}
		</DropdownMenuItem>
	);
}
