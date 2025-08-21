import { cn } from '@/lib/utils';

export function Loader({ className }: { className?: string }) {
	return (
		<div className={cn('flex flex-row gap-2', className)}>
			<div className="size-3 rounded-full bg-foreground animate-bounce" />
			<div className="size-3 rounded-full bg-foreground animate-bounce [animation-delay:-.3s]" />
			<div className="size-3 rounded-full bg-foreground animate-bounce [animation-delay:-.5s]" />
		</div>
	);
}
