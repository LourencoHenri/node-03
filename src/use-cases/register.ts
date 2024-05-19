import { hash } from "bcryptjs";

import { usersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseProps {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	constructor(private usersRepository: usersRepository) {}

	async execute({ name, email, password }: RegisterUseCaseProps) {
		const password_hash = await hash(password, 6);

		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		await this.usersRepository.create({
			name,
			email,
			password_hash,
		});
	}
}