import Image from 'next/image';

import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import Text from '@/components/ui/text';
import { useTheme } from 'next-themes';

export function DashboardSidebarHeader() {
	const { resolvedTheme } = useTheme();

	return (
		<SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem className="flex items-center gap-2">
					<Image
						src={`/mattar-${resolvedTheme}.svg`}
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
