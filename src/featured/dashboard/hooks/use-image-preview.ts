import { useCallback, useEffect, useState } from 'react';

/**
 * Hook for processing and generating input image previews, either image file previews or
 * external image URLs.
 *
 * @param initialUrl initial url for image preview if provided (optional)
 */
export function useImagePreview(initialUrl?: string) {
	const [defaultUrl, _setDefault] = useState('#');
	const [url, setUrl] = useState(defaultUrl);
	const [fileReader, setFileReader] = useState<FileReader | null>();

	/**
	 * Set file reader when window is defined to avoid SSR issues.
	 * This is run only once when the component mounts.
	 */
	useEffect(() => {
		if (window && !fileReader) {
			setFileReader(new FileReader());
		}

		return () => {
			fileReader?.abort();
		};
	}, [fileReader]);

	/**
	 * Set default url for image preview if initialUrl is provided and different from defaultUrl.
	 * This is rune only once when the component mounts or when initialUrl changes.
	 */
	useEffect(() => {
		if (initialUrl && initialUrl !== defaultUrl) {
			_setDefault(initialUrl);
			setUrl(initialUrl);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialUrl]);

	const setDefault = (url?: string) => {
		_setDefault((prev) => url ?? prev);
		setUrl((prev) => url ?? prev);
	};

	const set = useCallback(
		(url?: string) => setUrl(url ?? defaultUrl),
		[defaultUrl]
	);

	const reset = useCallback(() => setUrl(defaultUrl), [defaultUrl]);

	const inputHandler = useCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const { currentTarget } = event;

			if (currentTarget.files?.length && fileReader) {
				const file = currentTarget.files[0];

				fileReader.onload = ({ target }) => {
					if (target && typeof target.result === 'string') {
						setUrl(target.result);
					}
				};

				fileReader.readAsDataURL(file);

				return;
			}

			reset();
		},
		[fileReader, reset]
	);

	return {
		url,
		inputHandler,
		set,
		reset,
		setDefault,
	};
}
