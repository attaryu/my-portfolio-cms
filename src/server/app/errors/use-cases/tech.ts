import { ApplicationError } from '../app-error';

export namespace TechUseCaseErrors {
	export class BiggerPageIndex extends ApplicationError {
		constructor() {
			super('Page index is bigger than the total number of pages');
		}
	}

	export class TechNameAlreadyExists extends ApplicationError {
		constructor() {
			super(`Tech with name already exists`);
		}
	}

	export class TechLogoUrlAlreadyExists extends ApplicationError {
		constructor() {
			super(`Tech with logo URL already exists`);
		}
	}

	export class NotFound extends ApplicationError {
		constructor() {
			super(`Tech not found`);
		}
	}
}
