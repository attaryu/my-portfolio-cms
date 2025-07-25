import { InfraError } from '../infra-error';

export class InvalidRound extends InfraError {
	constructor(round: number) {
		super(`Invalid hashing round: ${round}. It must be a positive integer.`);
	}
}

export const HashingErrors = {
	InvalidRound,
};
