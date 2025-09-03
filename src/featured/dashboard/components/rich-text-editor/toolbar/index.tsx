import { useEditorState, type Editor } from '@tiptap/react';
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	Bold,
	ChevronsUpDown,
	ImagePlus,
	Italic,
	Link,
	List,
	ListOrdered,
	Underline,
	Unlink,
} from 'lucide-react';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogPortal,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ButtonController } from './button-controller';

import { createImageValidation } from '@/lib/react-hook-form-image-validation';
import { DashboardFormLabel } from '../../label';

type Props = {
	editor: Editor | null;
};

function _Toolbar({ editor }: Props) {
	const [uploadImageDialog, setUploadImageDialog] = useState(false);
	const [attachLinkDialog, setAttachLinkDialog] = useState(false);

	const uploadImageForm = useForm<{ image: FileList }>();
	const attachLinkForm = useForm<{ link: string }>();

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
				isCenter: editor?.isActive({ textAlign: 'center' }),
				isJustify: editor?.isActive({ textAlign: 'justify' }),
				isAttachedLink: editor?.isActive('link'),
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

	const uploadImageSubmit = uploadImageForm.handleSubmit((data) => {
		const file = data.image[0];

		if (file) {
			const fileReader = new FileReader();

			fileReader.onload = () => {
				editor
					?.chain()
					.setImage({ src: fileReader.result as string })
					.focus()
					.run();

				setUploadImageDialog(false);
				uploadImageForm.resetField('image');
			};

			fileReader.readAsDataURL(file);
		}
	});

	const attachLinkSubmit = attachLinkForm.handleSubmit((data) => {
		const { link } = data;

		if (link) {
			editor?.chain().setLink({ href: link }).focus().run();
			attachLinkForm.resetField('link');
			setAttachLinkDialog(false);
		}
	});

	function toggleAttachLinkDialog() {
		if (editorState?.isAttachedLink) {
			editor?.chain().unsetLink().focus().run();
		} else {
			setAttachLinkDialog(true);
		}
	}

	return (
		<>
			<div className="flex shadow-xs dark:bg-input/30 h-10 rounded-t-md sticky top-10 z-10 bg-background ring-1 ring-input">
				{/* text format */}
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

				{/* bold */}
				<ButtonController
					active={editorState?.isBold}
					onClick={() => editor?.chain().toggleBold().focus().run()}
				>
					<Bold />
				</ButtonController>

				{/* italic */}
				<ButtonController
					active={editorState?.isItalic}
					onClick={() => editor?.chain().toggleItalic().focus().run()}
				>
					<Italic />
				</ButtonController>

				{/* underline */}
				<ButtonController
					active={editorState?.isUnderline}
					onClick={() => editor?.chain().toggleUnderline().focus().run()}
				>
					<Underline />
				</ButtonController>

				<Separator orientation="vertical" />

				{/* bullet list */}
				<ButtonController
					active={editorState?.isBulletList}
					onClick={() => editor?.chain().toggleBulletList().focus().run()}
				>
					<List />
				</ButtonController>

				{/* ordered list */}
				<ButtonController
					active={editorState?.isOrderedList}
					onClick={() => editor?.chain().toggleOrderedList().focus().run()}
				>
					<ListOrdered />
				</ButtonController>

				<Separator orientation="vertical" />

				{/* text align left */}
				<ButtonController
					active={editorState?.isLeft}
					onClick={() => editor?.chain().setTextAlign('left').focus().run()}
				>
					<AlignLeft />
				</ButtonController>

				{/* text align center */}
				<ButtonController
					active={editorState?.isCenter}
					onClick={() => editor?.chain().setTextAlign('center').focus().run()}
				>
					<AlignCenter />
				</ButtonController>

				{/* text align justify */}
				<ButtonController
					active={editorState?.isJustify}
					onClick={() => editor?.chain().setTextAlign('justify').focus().run()}
				>
					<AlignJustify />
				</ButtonController>

				<Separator orientation="vertical" />

				{/* upload image */}
				<ButtonController onClick={() => setUploadImageDialog(true)}>
					<ImagePlus />
				</ButtonController>

				{/* attach/unattach link */}
				<ButtonController
					onClick={toggleAttachLinkDialog}
					active={editorState?.isAttachedLink}
				>
					{editorState?.isAttachedLink ? <Unlink /> : <Link />}
				</ButtonController>

				<Separator orientation="vertical" />
			</div>

			{/* upload image dialog */}
			<Dialog open={uploadImageDialog} onOpenChange={setUploadImageDialog}>
				<DialogPortal>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add image</DialogTitle>

							<DialogDescription>
								Upload a png, jpg, jpeg, or webp file
							</DialogDescription>
						</DialogHeader>

						<DashboardFormLabel
							label="Image"
							htmlFor="image"
							errorMessage={uploadImageForm.formState.errors.image?.message}
						>
							<Input
								type="file"
								id="image"
								accept="image/png, image/jpeg, image/webp, image/jpg"
								{...uploadImageForm.register('image', {
									required: true,
									validate: createImageValidation({
										maxSize: 2,
										acceptable: [
											'image/png',
											'image/jpeg',
											'image/webp',
											'image/jpg',
										],
									}),
								})}
							/>
						</DashboardFormLabel>

						<DialogFooter>
							<Button onClick={uploadImageSubmit}>Attach</Button>
						</DialogFooter>
					</DialogContent>
				</DialogPortal>
			</Dialog>

			{/* attach link dialog */}
			<Dialog open={attachLinkDialog} onOpenChange={setAttachLinkDialog}>
				<DialogPortal>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Attach Link</DialogTitle>

							<DialogDescription>
								Enter the URL of the link you want to attach
							</DialogDescription>
						</DialogHeader>

						<DashboardFormLabel
							label="Link"
							htmlFor="link"
							errorMessage={attachLinkForm.formState.errors.link?.message}
						>
							<Input
								type="url"
								id="link"
								{...attachLinkForm.register('link', {
									required: true,
									maxLength: {
										value: 2048,
										message: 'Link must be at most 2048 characters long',
									},
									minLength: {
										value: 5,
										message: 'Link must be at least 5 characters long',
									},
								})}
							/>
						</DashboardFormLabel>

						<DialogFooter>
							<Button onClick={attachLinkSubmit}>Attach</Button>
						</DialogFooter>
					</DialogContent>
				</DialogPortal>
			</Dialog>
		</>
	);
}

export const Toolbar = memo(_Toolbar);
