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
	data: PayloadType,
	config: AxiosRequestConfig = {}
) {
	return axiosInstance
		.post<
			ISuccessResponse<ResponseType>,
			AxiosResponse<ISuccessResponse<ResponseType>>,
			PayloadType
		>(url, data, config)
		.then((response) => response.data);
}
