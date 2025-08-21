export const getAccessToken = () => localStorage.getItem('ACCESS_TOKEN');

export const storeAccessToken = (token: string) =>
	localStorage.setItem('ACCESS_TOKEN', token);
