import { useEditorState, type Editor } from '@tiptap/react';
import {
	AlignJustify,
	AlignLeft,
	Bold,
	ChevronsUpDown,
	Italic,
	List,
	ListOrdered,
	Underline,
} from 'lucide-react';
import { memo } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ButtonController } from './button-controller';

type Props = {
	editor: Editor | null;
};

function _Toolbar({ editor }: Props) {
	const editorState = useEditorState({
		editor,
		selector: ({ editor }) => {
			const currentSelectedFormat =
				editor?.getAttributes('heading')?.level ?? 0;

			return {
				isBold: editor?.isActive('bold'),
				isItalic: editor?.isActive('italic'),
				isUnderline: editor?.isActive('underline'),
				isBulletList: editor?.isActive('bulletList'),
				isOrderedList: editor?.isActive('orderedList'),
				isLeft: editor?.isActive({ textAlign: 'left' }),
				isJustify: editor?.isActive({ textAlign: 'justify' }),
				currentSelectedFormat:
					currentSelectedFormat === 1
						? 'Heading 1'
						: currentSelectedFormat === 2
						? 'Heading 2'
						: currentSelectedFormat === 3
						? 'Heading 3'
						: 'Paragraph',
			};
		},
	});

	return (
		<div className="flex shadow-xs dark:bg-input/30 h-10 rounded-t-md sticky top-10 z-10 bg-background ring-1 ring-input">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="rounded-none w-32 !h-10 rounded-tl-md"
					>
						{editorState?.currentSelectedFormat}

						<ChevronsUpDown />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() => {
							console.log('run');
							editor?.chain().setHeading({ level: 1 }).focus().run();
						}}
					>
						Heading 1
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() =>
							editor?.chain().setHeading({ level: 2 }).focus().run()
						}
					>
						Heading 2
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() =>
							editor?.chain().setHeading({ level: 3 }).focus().run()
						}
					>
						Heading 3
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={() => editor?.chain().setParagraph().focus().run()}
					>
						Paragraph
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<Separator orientation="vertical" />

			<ButtonController
				active={editorState?.isBold}
				onClick={() => editor?.chain().toggleBold().focus().run()}
			>
				<Bold />
			</ButtonController>

			<ButtonController
				active={editorState?.isItalic}
				onClick={() => editor?.chain().toggleItalic().focus().run()}
			>
				<Italic />
			</ButtonController>

			<ButtonController
				active={editorState?.isUnderline}
				onClick={() => editor?.chain().toggleUnderline().focus().run()}
			>
				<Underline />
			</ButtonController>

			<Separator orientation="vertical" />

			<ButtonController
				active={editorState?.isBulletList}
				onClick={() => editor?.chain().toggleBulletList().focus().run()}
			>
				<List />
			</ButtonController>

			<ButtonController
				active={editorState?.isOrderedList}
				onClick={() => editor?.chain().toggleOrderedList().focus().run()}
			>
				<ListOrdered />
			</ButtonController>

			<Separator orientation="vertical" />

			<ButtonController
				active={editorState?.isLeft}
				onClick={() => editor?.chain().setTextAlign('left').focus().run()}
			>
				<AlignLeft />
			</ButtonController>

			<ButtonController
				active={editorState?.isJustify}
				onClick={() => editor?.chain().setTextAlign('justify').focus().run()}
			>
				<AlignJustify />
			</ButtonController>
		</div>
	);
}

export const Toolbar = memo(_Toolbar);
