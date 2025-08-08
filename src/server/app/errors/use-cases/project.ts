import { ApplicationError } from '../app-error';

class NotFound extends ApplicationError {
	constructor() {
		super('Project not found');
	}
}

class SomeIdsNotFound extends ApplicationError {
	constructor() {
		super('Some project IDs were not found');
	}
}

export const ProjectUseCaseErrors = {
	NotFound,
	SomeIdsNotFound,
};
