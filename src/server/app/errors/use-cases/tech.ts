import { ApplicationError } from '../app-error';

class BiggerPageIndex extends ApplicationError {
	constructor() {
		super('Page index is bigger than the total number of pages');
	}
}

class UniqueField extends ApplicationError {
	constructor(field: string) {
		super(`Tech ${field} already exists`);
	}
}

class NotFound extends ApplicationError {
	constructor(message?: string) {
		super(message ?? 'Tech not found');
	}
}

export const TechUseCaseErrors = {
	BiggerPageIndex,
	UniqueField,
	NotFound,
};
