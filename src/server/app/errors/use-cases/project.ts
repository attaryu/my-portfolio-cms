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

class TopProjectDeleteStrict extends ApplicationError {
	constructor(deleteType: 'single' | 'multiple') {
		if (deleteType === 'single') {
			super(
				"The project is associated with the top project that can't be deleted"
			);
		} else if (deleteType === 'multiple') {
			super(
				"Some projects are associated with the top project that can't be deleted"
			);
		} else {
			super('unknown delete type');
		}
	}
}

export const ProjectUseCaseErrors = {
	NotFound,
	SomeIdsNotFound,
	TopProjectDeleteStrict,
};
