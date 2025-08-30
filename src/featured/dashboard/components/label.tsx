import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { FieldError } from './field-error';

type Props = {
	htmlFor?: string;
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

			<FieldError message={errorMessage} />
		</div>
	);
}
