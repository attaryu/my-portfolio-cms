import { Camera } from 'lucide-react';
import Image from 'next/image';

import Text from '@/components/ui/text';

export default function DashboardPage() {
	return (
		<main className="p-1">
			<div className="w-full h-[calc(100dvh_-_24px)] flex-col flex gap-2 justify-center items-center relative">
				<Image
					src="/wallpaper-1.jpg"
					alt=""
					className="absolute object-cover inset-x-0 h-full -z-10 rounded-xl brightness-90 dark:brightness-50"
					width={2000}
					height={2000}
				/>

				<Text tag="h1" className="text-white dark:text-zinc-200">
					Hello, M Attar!
				</Text>

				<Text styling="lead" className="text-zinc-200 dark:text-zinc-400">
					Ready to manage your content?
				</Text>

				<div className="absolute bottom-4 flex gap-2 items-center  ">
					<Camera className="text-zinc-300" size={16} />

					<Text tag="small" styling="muted" className="text-zinc-300">
						Photo by{' '}
						<a
							target="_blank"
							className="hover:underline"
							href="https://unsplash.com/@jzwadlo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							James Zwadlo
						</a>{' '}
						on{' '}
						<a
							target="_blank"
							className="hover:underline"
							href="https://unsplash.com/photos/pathway-between-rail-guards-5RRseu8n_5s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
						>
							Unsplash
						</a>
					</Text>
				</div>
			</div>
		</main>
	);
}
