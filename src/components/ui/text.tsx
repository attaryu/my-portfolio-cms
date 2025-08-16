import { cn } from '@/lib/utils';
import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

interface Props extends VariantProps<typeof textCVA> {
	tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
	className?: string;
	children?: React.ReactNode;
}

const textCVA = cva('scroll-m-20 text-start', {
	variants: {
		styling: {
			h1: 'text-4xl font-extrabold tracking-tight text-balance',
			h2: 'pb-2 text-3xl font-semibold tracking-tight first:mt-0',
			h3: 'text-2xl font-semibold tracking-tight',
			h4: 'text-xl font-semibold tracking-tight',
			p: 'leading-7',
			large: 'text-lg font-semibold',
			lead: 'text-muted-foreground text-xl',
			small: 'text-sm leading-none font-medium',
			muted: 'text-muted-foreground text-sm',
		},
	},
});

export default function Text({ tag, children, className, styling }: Props) {
	const Tag = tag ?? 'p';

	if (!children) {
		return null;
	}

	return (
		<Tag className={cn(textCVA({ styling: styling ?? Tag }), className)}>
			{children}
		</Tag>
	);
}
