import { SidebarProvider } from '@/components/ui/sidebar';
import { DashboardSidebar } from '@/featured/dashboard/components/main-sidebar';

type Props = {
	children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
	return (
		<SidebarProvider>
			<DashboardSidebar />

			<div className="py-2 pr-2 w-full">{children}</div>
		</SidebarProvider>
	);
}
