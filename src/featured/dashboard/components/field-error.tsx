import Text from '@/components/ui/text';

type Props = {
	message?: string;
	className?: string;
};

export function FieldError({ message, className }: Props) {
	if (message) {
		return (
			<Text tag="small" styling="muted" className={`text-destructive ${className}`}>
				{message}
			</Text>
		);
	}
}
