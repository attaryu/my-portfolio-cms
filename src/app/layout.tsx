import type { Metadata } from 'next';

import { Geist, Geist_Mono } from 'next/font/google';

import { Toaster } from '@/components/ui/sonner';
import RootLayoutClient from './client';
import './globals.css';

const geistSans = Geist({
	variable: '--geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'My Portfolio CMS',
	description: "M Attar's content management system dashboard",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<RootLayoutClient>{children}</RootLayoutClient>
				<Toaster position="top-center" />
			</body>
		</html>
	);
}
