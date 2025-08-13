import { ApplicationError } from '../app-error';

export class NotFound extends ApplicationError {
	constructor() {
		super('Landing data not found');
	}
}

export const LandingDataUseCaseErrors = {
	NotFound,
};
