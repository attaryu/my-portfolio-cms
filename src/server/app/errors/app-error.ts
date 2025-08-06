export class ApplicationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ApplicationError';
	}
}

class BiggerPageIndex extends ApplicationError {
	constructor() {
		super('Page index is bigger than the total number of pages');
	}
}

export const GeneralAppError = {
	BiggerPageIndex,
};
