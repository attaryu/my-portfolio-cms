'use client';

import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { Toolbar } from './toolbar';

type Props = {
	value?: string;
	onChange?: (value?: string) => void;
	disabled?: boolean;
};

export function RichTextEditor({ disabled, onChange, value }: Props) {
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
		editable: !disabled,
		content: value ? JSON.parse(value) : undefined,
		onUpdate: ({ editor }) => {
			if (editor.isEmpty) {
				onChange?.(undefined);
			} else {
				onChange?.(JSON.stringify(editor.getJSON()));
			}
		},
		immediatelyRender: false,
	});

	useEffect(() => {
		if (editor && !editor.isEmpty) {
			const json = JSON.stringify(editor.getJSON());

			if (json !== value) {
				editor.commands.setContent(json, { emitUpdate: false });
			}
		}
	}, [value, editor]);

	return (
		<div className="border-input dark:bg-input/30 min-h-16 w-full rounded-md border bg-transparent shadow-xs">
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}
