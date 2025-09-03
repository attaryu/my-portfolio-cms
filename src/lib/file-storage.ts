import { upload as vercelBlobUpload } from '@vercel/blob/client';

import { axiosInstance } from './axios/global';

const uploadUrl = '/blob-upload';

export const upload = async (path: string, file: File) => {
	const uploadedFiles = await vercelBlobUpload(path + '/' + file.name, file, {
		access: 'public',
		handleUploadUrl: '/api' + uploadUrl,
	});

	return uploadedFiles;
};

export const del = async (blobUrl: string | string[]) => {
	const payload = Array.isArray(blobUrl) ? blobUrl : [blobUrl];

	if (payload.length) {
		axiosInstance.delete(uploadUrl + `?blob-url=${JSON.stringify(payload)}`, {
			baseURL: '/api',
		});
	}
};
