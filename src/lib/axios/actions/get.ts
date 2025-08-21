import type { ISuccessResponse } from '@/server/presentation/http/types/response';

import { axiosInstance } from '../global';

export async function axiosGet<PayloadData>(url: string) {
	return axiosInstance
		.get<ISuccessResponse<PayloadData>>(url)
		.then((response) => response.data);
}
