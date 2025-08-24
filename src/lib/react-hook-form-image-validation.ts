import { Validate } from 'react-hook-form';

type ImageValidation = {
	/**
	 * Maximum file size in MB
	 */
	maxSize: number;
	/**
	 * Acceptable file types
	 */
	acceptable: string[];
};

/**
 * Create image validation rules for react-hook-form useForm register
 */
export const createImageValidation = ({
	maxSize,
	acceptable,
}: ImageValidation): Record<
	string,
	Validate<FileList | undefined | null, unknown>
> => ({
	maxSize: (fileList) => {
		const file = fileList?.[0];

		if (!file) {
			return true;
		}

		return (
			file.size <= maxSize * 1024 * 1024 ||
			`File size must be less than ${maxSize}MB`
		);
	},
	acceptable: (fileList) => {
		const file = fileList?.[0];

		if (!file) {
			return true;
		}

		return acceptable.includes(file.type)
			? true
			: `File type must be ${acceptable.join(', ')}`;
	},
});
