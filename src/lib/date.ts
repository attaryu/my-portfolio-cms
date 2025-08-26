const config = new Intl.DateTimeFormat('id-ID', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
});

export const formatDate = (date: Date | string | number) =>
	config.format(date instanceof Date ? date : new Date(date));
