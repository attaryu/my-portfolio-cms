import type { AxiosResponse } from 'axios';

import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';
import { getAccessToken } from '../../access-token';

export type AxiosPatchParameter<PayloadType> = {
	url: string;
	data?: PayloadType;
	includeCredential?: boolean;
};

export async function axiosPatch<ResponseType, PayloadType = unknown>({
	url,
	data,
	includeCredential = false,
}: AxiosPatchParameter<PayloadType>) {
	return axiosInstance
		.patch<
			ISuccessResponse<ResponseType>,
			AxiosResponse<ISuccessResponse<ResponseType>>,
			PayloadType
		>(url, data, {
			headers: includeCredential
				? { Authorization: `Bearer ${getAccessToken()}` }
				: undefined,
		})
		.then((response) => response.data);
}
