import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Text from '@/components/ui/text';

export function DashboardSidebarHeader() {
	const { resolvedTheme, theme } = useTheme();
	const [logoUrl, setLogoUrl] = useState('/mattar-light.svg');

	useEffect(() => {
		setLogoUrl(`/mattar-${resolvedTheme ?? theme}.svg`);
	}, [resolvedTheme, theme]);

	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem className="flex items-center gap-2">
					<Image
						suppressHydrationWarning
						src={logoUrl}
						alt=""
						width={40}
						height={40}
						className="rounded-md select-none"
					/>

					<div className="-space-y-1">
						<Text tag="p" styling="large" className="text-base">
							MA Dashboard
						</Text>

						<Text tag="small" styling="muted" className="text-xs">
							Content Management System
						</Text>
					</div>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}
