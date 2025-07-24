import { ApplicationError } from '../app-error';

export namespace TechUseCaseErrors {
	export class BiggerPageIndex extends ApplicationError {
		constructor() {
			super('Page index is bigger than the total number of pages');
		}
	}
}
