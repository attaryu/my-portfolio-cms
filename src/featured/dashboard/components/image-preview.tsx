type Props = {
	src?: string;
	width?: number;
	height?: number;
};

export function ImagePreview({ src = '#', width = 400, height = 200 }: Props) {
	return (
		<div className="p-2 rounded-xl border border-dashed">
			<img
				src={src}
				alt=""
				data-error={src === '#' ? 'Image preview' : 'The image is broken :('}
				className="w-full relative object-contain rounded-lg before:content-[attr(data-error)] before:absolute before:inset-0 before:bg-accent before:text-foreground before:text-sm before:grid  before:place-items-center "
				width={width}
				height={height}
			/>
		</div>
	);
}
