import { Label } from '@/components/ui/label';
import Text from '@/components/ui/text';
import { cn } from '@/lib/utils';

type Props = {
	htmlFor: string;
	label: string;
	children: React.ReactNode;
	errorMessage?: string;
	className?: string;
};

export function DashboardFormLabel({
	htmlFor,
	children,
	label,
	errorMessage,
	className,
}: Props) {
	return (
		<div className={cn('space-y-2', className)}>
			<Label htmlFor={htmlFor}>{label}</Label>

			{children}

			{errorMessage && (
				<Text tag="small" styling="muted" className="text-red-500">
					{errorMessage}
				</Text>
			)}
		</div>
	);
}
