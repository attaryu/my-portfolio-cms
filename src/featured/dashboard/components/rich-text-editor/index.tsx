'use client';

import type { JSONContent } from '@tiptap/react';

import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { memo } from 'react';

import { Toolbar } from './toolbar';

type Props = {
	value?: JSONContent;
	onChange?: (value?: JSONContent) => void;
	disabled?: boolean;
};

const extensions = [
	StarterKit.configure({
		heading: { levels: [1, 2, 3] },
		blockquote: false,
		code: false,
		codeBlock: false,
	}),
	TextAlign.configure({
		types: ['heading', 'paragraph'],
		alignments: ['left', 'justify', 'center'],
		defaultAlignment: 'justify',
	}),
	Image.configure({ allowBase64: true }),
	Link.configure({
		protocols: ['https'],
		defaultProtocol: 'https',
		autolink: true,
	}),
];

function _RichTextEditor({ disabled, onChange, value }: Props) {
	const editor = useEditor({
		extensions,
		editable: !disabled,
		content: value,
		immediatelyRender: false,
		editorProps: {
			attributes: {
				class:
					'px-3 py-2 focus:outline-none min-h-32 rich-text-container max-h-[600px] overflow-y-auto',
			},
		},
		onUpdate: ({ editor }) => {
			if (editor.isEmpty) {
				onChange?.(undefined);
			} else {
				onChange?.(editor.getJSON());
			}
		},
	});

	return (
		<div className="border-input relative dark:bg-input/30 min-h-16 w-full rounded-md border bg-transparent shadow-xs">
			<Toolbar editor={editor} />
			<EditorContent editor={editor} />
		</div>
	);
}

export const RichTextEditor = memo(_RichTextEditor);
