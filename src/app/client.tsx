'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { useState } from 'react';

export default function RootLayoutClient({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			})
	);

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
				<NuqsAdapter>{children}</NuqsAdapter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
