'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
  AlignJustify,
  AlignLeft,
  Bold,
  Italic,
  List,
  ListOrdered,
  Underline
} from 'lucide-react';
import { ButtonController } from './button-controller';

export function RichTextEditor() {
	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
				blockquote: false,
				code: false,
				codeBlock: false,
			}),
			TextAlign.configure({
				types: ['heading', 'paragraph'],
				alignments: ['left', 'justify'],
				defaultAlignment: 'justify',
			}),
		],
		editorProps: {
			attributes: {
				class: 'px-3 py-2 focus:outline-none min-h-32 md:text-sm text-base',
			},
		},
		immediatelyRender: false,
	});

	const editorState = useEditorState({
		editor,
		selector: ({ editor }) => ({
			isBold: editor?.isActive('bold'),
			isItalic: editor?.isActive('italic'),
			isUnderline: editor?.isActive('underline'),
			isBulletList: editor?.isActive('bulletList'),
			isOrderedList: editor?.isActive('orderedList'),
			isLeft: editor?.isActive({ textAlign: 'left' }),
			isJustify: editor?.isActive({ textAlign: 'justify' }),
		}),
	});

	return (
		<div className="border-input dark:bg-input/30 min-h-16 w-full rounded-md border bg-transparent shadow-xs">
			<div className="border-b border-input flex shadow-xs dark:bg-input/30 h-10 rounded-t-md">
				<Select defaultValue="paragraph">
					<SelectTrigger className="rounded-none w-32 !h-10 border-none hover:bg-muted rounded-tl-md">
						<SelectValue />
					</SelectTrigger>

					<SelectContent>
						<SelectItem
							value="heading-1"
							onClick={() =>
								editor?.chain().setHeading({ level: 1 }).focus().run()
							}
						>
							Heading 1
						</SelectItem>

						<SelectItem
							value="heading-2"
							onClick={() =>
								editor?.chain().setHeading({ level: 2 }).focus().run()
							}
						>
							Heading 2
						</SelectItem>

						<SelectItem
							value="heading-3"
							onClick={() =>
								editor?.chain().setHeading({ level: 3 }).focus().run()
							}
						>
							Heading 3
						</SelectItem>

						<SelectItem
							value="paragraph"
							onClick={() => editor?.chain().setParagraph().focus().run()}
						>
							Paragraph
						</SelectItem>
					</SelectContent>
				</Select>

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

			<EditorContent editor={editor} />
		</div>
	);
}
