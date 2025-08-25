import type { AxiosResponse } from 'axios';

import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';

export async function axiosDelete<PayloadType = unknown>(
	url: string,
	data?: PayloadType
) {
	return axiosInstance
		.delete<
			ISuccessResponse<unknown>,
			AxiosResponse<ISuccessResponse<unknown>>,
			PayloadType
		>(url, { data })
		.then((response) => response.data);
}
