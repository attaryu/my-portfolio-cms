import type { AxiosRequestConfig, AxiosResponse } from 'axios';

import type {
	IFailResponse,
	ISuccessResponse,
} from '@/server/presentation/http/types/response';

import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

export async function axiosPost<ResponseType, PayloadType = unknown>(
	url: string,
	data?: PayloadType
) {
	return axiosInstance
		.post<
			ISuccessResponse<ResponseType>,
			AxiosResponse<ISuccessResponse<ResponseType>>,
			PayloadType
		>(url, data)
		.then((response) => response.data);
}

export async function axiosDelete<PayloadType = unknown>(
	url: string,
	data?: PayloadType
) {
	if (data) {
		return axiosInstance
			.post<
				ISuccessResponse<unknown>,
				AxiosResponse<ISuccessResponse<unknown>>,
				PayloadType
			>(url, data, {
				method: 'DELETE',
			})
			.then((response) => response.data);
	}

	return axiosInstance
		.delete<
			ISuccessResponse<unknown>,
			AxiosResponse<ISuccessResponse<unknown>>
		>(url)
		.then((response) => response.data);
}
