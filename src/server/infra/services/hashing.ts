import type { IHashing } from '@/server/app/services/hashing';

import { compare, genSalt, getRounds, hash } from 'bcrypt';
import { HashingErrors } from '../errors/services/hashing';

export class Hashing implements IHashing {
	async generateHash(text: string): Promise<string> {
		const salt = await genSalt(10);
		const hashedText = await hash(text, salt);

		return hashedText;
	}

	async verifyHash(text: string, hash: string): Promise<boolean> {
		const rounds = getRounds(hash);

		if (rounds <= 0) {
			throw new HashingErrors.InvalidRound(rounds);
		}

		return await compare(text, hash);
	}
}
