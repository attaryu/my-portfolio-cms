import { upload as vercelBlobUpload } from '@vercel/blob/client';

import { axiosInstance } from './axios/global';

const uploadUrl = '/blob-upload';

export const upload = async (path: string, file: File) => {
	const _file = await vercelBlobUpload(path, file, {
		access: 'public',
		handleUploadUrl: '/api' + uploadUrl,
	});

	return _file;
};

export const del = async (pathAndFilename: string) => {
	axiosInstance.delete(uploadUrl + `?blob-url=${pathAndFilename}`, {
		baseURL: '/api',
	});
};
