import type { AxiosResponse } from 'axios';

import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';

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
