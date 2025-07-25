import { ApplicationError } from '../app-error';

export namespace TechUseCaseErrors {
	export class BiggerPageIndex extends ApplicationError {
		constructor() {
			super('Page index is bigger than the total number of pages');
		}
	}

	export class UniqueField extends ApplicationError {
		constructor(field: string) {
			super(`Tech ${field} already exists`);
		}
	}

	export class NotFound extends ApplicationError {
		constructor() {
			super(`Tech not found`);
		}
	}
}
