export class InfraError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'InfraError';
	}
}
