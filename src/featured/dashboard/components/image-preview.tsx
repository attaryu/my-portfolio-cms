type Props = {
	src?: string;
};

export function ImagePreview({ src }: Props) {
	if (src) {
		return (
			<div className="p-2 rounded-xl border border-dashed">
				<img
					src={src ?? '#'}
					alt=""
					data-error="The image is broken :("
					className="w-full relative h-[400px] object-contain rounded-lg before:content-[attr(data-error)] before:absolute before:inset-0 before:bg-accent before:text-foreground before:text-sm before:grid  before:place-items-center "
				/>
			</div>
		);
	}
}
