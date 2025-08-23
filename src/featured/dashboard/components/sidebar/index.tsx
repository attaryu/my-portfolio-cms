'use client';

import { ChevronRight, Folder, House, ToolCase, UserStar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { DashboardSidebarFooter } from './sidebar-footer';
import { DashboardSidebarHeader } from './sidebar-header';

type LinkType = {
	type: 'link';
	label: string;
	href: string;
	icon?: React.ElementType;
};

type CollapsibleSubGroupType = {
	type: 'collapsible';
	label: string;
	icon: React.ElementType;
	sub: LinkType[];
};

type LinkGroupType = {
	label: string;
	sub: (LinkType | CollapsibleSubGroupType)[];
};

const links: LinkGroupType[] = [
	{
		label: 'Main Menu',
		sub: [
			{
				type: 'link',
				label: 'Home',
				href: '/dashboard',
				icon: House,
			},
		],
	},
	{
		label: 'Content',
		sub: [
			{
				type: 'link',
				label: 'Owner Information',
				href: '/dashboard/owner-information',
				icon: UserStar,
			},
			{
				type: 'link',
				label: 'Project',
				href: '/dashboard/projects',
				icon: Folder,
			},
			{
				type: 'collapsible',
				label: 'Technologies',
				icon: ToolCase,
				sub: [
					{
						type: 'link',
						label: 'All Technologies',
						href: '/dashboard/technologies',
					},
					{
						type: 'link',
						label: 'Create Technology',
						href: '/dashboard/technologies/create',
					},
				],
			},
		],
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon" variant="floating">
			<DashboardSidebarHeader />

			<SidebarContent>
				{links.map((link) => (
					<SidebarGroup key={link.label}>
						<SidebarGroupLabel>{link.label}</SidebarGroupLabel>

						<SidebarGroupContent>
							<SidebarMenu>
								{link.sub.map((subLink) =>
									subLink.type === 'link' ? (
										<SidebarMenuItem key={subLink.label}>
											<SidebarMenuButton
												asChild
												isActive={pathname === subLink.href}
											>
												<Link href={subLink.href}>
													{subLink.icon && <subLink.icon />}

													{subLink.label}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									) : (
										<Collapsible
											key={subLink.label}
											defaultOpen
											className="group/collapsible"
										>
											<SidebarMenuItem>
												<CollapsibleTrigger asChild>
													<SidebarMenuButton className="w-full">
														{subLink.icon && <subLink.icon />}
														{subLink.label}

														<ChevronRight className="ml-auto group-data-[state=open]/collapsible:rotate-90" />
													</SidebarMenuButton>
												</CollapsibleTrigger>

												<CollapsibleContent>
													<SidebarMenuSub>
														{subLink.sub.map((subItem) => (
															<SidebarMenuSubItem key={subItem.label}>
																<SidebarMenuButton
																	asChild
																	isActive={pathname === subItem.href}
																	className="w-full"
																>
																	<Link href={subItem.href}>
																		{subItem.icon && <subItem.icon />}
																		{subItem.label}
																	</Link>
																</SidebarMenuButton>
															</SidebarMenuSubItem>
														))}
													</SidebarMenuSub>
												</CollapsibleContent>
											</SidebarMenuItem>
										</Collapsible>
									)
								)}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>

			<DashboardSidebarFooter />
		</Sidebar>
	);
}
