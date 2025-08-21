const KEY = 'ACCESS_TOKEN';

export const getAccessToken = () => localStorage.getItem(KEY);

export const storeAccessToken = (token: string) =>
	localStorage.setItem(KEY, token);

export const removeAccessToken = () => localStorage.removeItem(KEY);
