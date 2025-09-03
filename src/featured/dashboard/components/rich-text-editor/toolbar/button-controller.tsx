'use client';

import { Button } from '@/components/ui/button';

type Props = {
	children: React.ReactNode;
	onClick?: () => void;
	active?: boolean;
};

export function ButtonController({ children, onClick, active }: Props) {
	return (
		<Button
			onClick={onClick}
			variant={active ? 'default' : 'ghost'}
			className="size-10 rounded-none"
		>
			{children}
		</Button>
	);
}
