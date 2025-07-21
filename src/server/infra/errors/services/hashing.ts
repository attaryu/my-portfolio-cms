import { InfraError } from '../infra-error';

export namespace HashingErrors {
	export class InvalidRound extends InfraError {
		constructor(round: number) {
			super(`Invalid hashing round: ${round}. It must be a positive integer.`);
		}
	}
}
