import { ApplicationError } from '../app-error';

class NotFound extends ApplicationError {
	constructor() {
		super('Project not found');
	}
}

export const ProjectUseCaseErrors = {
	NotFound,
};
