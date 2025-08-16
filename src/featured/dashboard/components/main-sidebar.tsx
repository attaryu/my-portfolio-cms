'use client';

import { Folder, House, ToolCase, UserStar } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { DashboardSidebarFooter } from './sidebar-footer';
import { DashboardSidebarHeader } from './sidebar-header';

type LinkType = {
	type: 'link';
	label: string;
	href: string;
	icon: React.ElementType;
};

type LinkGroupType = {
	type: 'group';
	label: string;
	sub: LinkType[];
};

const links: (LinkGroupType | LinkType)[] = [
	{ type: 'link', label: 'Home', href: '/dashboard', icon: House },
	{
		type: 'group',
		label: 'Content',
		sub: [
			{
				type: 'link',
				label: 'Owner Information',
				href: '/dashboard/owner',
				icon: UserStar,
			},
			{
				type: 'link',
				label: 'Project',
				href: '/dashboard/projects',
				icon: Folder,
			},
			{
				type: 'link',
				label: 'Technologies',
				href: '/dashboard/technologies',
				icon: ToolCase,
			},
		],
	},
];

export function DashboardSidebar() {
	const pathname = usePathname();

	return (
		<Sidebar collapsible="icon" variant="floating">
			<DashboardSidebarHeader />

			<SidebarContent className="mt-4">
				{links.map((link) =>
					link.type === 'group' ? (
						<SidebarGroup key={link.label}>
							<SidebarGroupLabel>{link.label}</SidebarGroupLabel>

							<SidebarGroupContent>
								<SidebarMenu>
									{link.sub.map((subLink) => (
										<SidebarMenuItem key={subLink.label}>
											<SidebarMenuButton
												asChild
												isActive={pathname === subLink.href}
											>
												<Link href={subLink.href}>
													<subLink.icon />

													{subLink.label}
												</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					) : (
						<SidebarGroup key={link.label}>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem key={link.label}>
										<SidebarMenuButton
											asChild
											isActive={pathname === link.href}
										>
											<Link href={link.href}>
												<link.icon />

												{link.label}
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					)
				)}
			</SidebarContent>

			<DashboardSidebarFooter />
		</Sidebar>
	);
}
