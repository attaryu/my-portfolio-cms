import type { AxiosResponse } from 'axios';

import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';

export async function axiosPatch<ResponseType, PayloadType = unknown>(
	url: string,
	data?: PayloadType
) {
	return axiosInstance
		.patch<
			ISuccessResponse<ResponseType>,
			AxiosResponse<ISuccessResponse<ResponseType>>,
			PayloadType
		>(url, data)
		.then((response) => response.data);
}
