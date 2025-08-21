import type { AxiosResponse } from 'axios';

import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';

export async function axiosPut<PayloadType = unknown, ResponseType = unknown>(
	url: string,
	data: PayloadType
) {
	return axiosInstance
		.put<
			PayloadType,
			AxiosResponse<ISuccessResponse<ResponseType>>,
			PayloadType
		>(url, data)
		.then((response) => response.data);
}
