import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/featured/dashboard/components/sidebar';

type Props = {
	children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
	return (
		<SidebarProvider>
			<DashboardSidebar />

			<div className="py-[var(--sidebar-content-layout-padding)] pr-[var(--sidebar-content-layout-padding)] w-full">
				{children}
			</div>
		</SidebarProvider>
	);
}
