import axios, { AxiosError } from 'axios';

import { getAccessToken, storeAccessToken } from '../access-token';

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

axiosInstance.interceptors.request.use((config) => {
	const accessToken = getAccessToken();

	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error: AxiosError) => {
		if (error.response?.status === 401) {
			const tokenResponse = await axiosInstance.get('/owner/access-token');

			if (tokenResponse.status === 200) {
				storeAccessToken(tokenResponse.data.data.access_token);
				return axiosInstance(error.config!);
			} else {
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);
