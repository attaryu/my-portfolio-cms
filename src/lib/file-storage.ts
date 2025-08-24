import { upload as vercelBlobUpload } from '@vercel/blob/client';

import { axiosInstance } from './axios/global';

const uploadUrl = '/blob-upload';

export const upload = async (path: string, file: File) => {
	const _file = await vercelBlobUpload(path + '/' + file.name, file, {
		access: 'public',
		handleUploadUrl: '/api' + uploadUrl,
	});

	return _file;
};

export const del = async (blobUrl: string) => {
	axiosInstance.delete(uploadUrl + `?blob-url=${blobUrl}`, {
		baseURL: '/api',
	});
};
