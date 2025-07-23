export class HttpError extends Error {
	public readonly statusCode: number;
	public readonly errorCode: string;

	constructor(statusCode: number, message: string, errorCode?: string) {
		super(message);
		this.name = 'HttpError';
		this.statusCode = statusCode;
		this.errorCode = errorCode ?? 'UNKNOWN_ERROR';

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, HttpError);
		}
	}

	static badRequest(message: string, errorCode?: string): HttpError {
		return new HttpError(400, message, errorCode ?? 'BAD_REQUEST');
	}

	static unauthorized(message: string, errorCode?: string): HttpError {
		return new HttpError(401, message, errorCode ?? 'UNAUTHORIZED');
	}

	static forbidden(message: string, errorCode?: string): HttpError {
		return new HttpError(403, message, errorCode ?? 'FORBIDDEN');
	}

	static notFound(message: string, errorCode?: string): HttpError {
		return new HttpError(404, message, errorCode ?? 'NOT_FOUND');
	}

	static internalServerError(message?: string, errorCode?: string): HttpError {
		return new HttpError(
			500,
			message ?? 'Internal server error',
			errorCode ?? 'INTERNAL_SERVER_ERROR'
		);
	}
}
