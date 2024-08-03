import { IUserInput } from "@common/types/user";
import createHttpError from "http-errors";
import httpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import UserModel from "@models/user.model";

/**
 * Authenticates a user by checking if the provided email and password match a user record in the database.
 * @param userInput - The user input containing the email and password.
 * @returns The user payload containing the user's ID and email.
 * @throws If the email does not exist or the password is incorrect.
 */
export async function loginUser(userInput: IUserInput) {
	try {
		const userCheck = await UserModel.findOne({ email: userInput.email });
		if (!userCheck) {
			throw createHttpError(httpStatus.FORBIDDEN, "Email does not exist, please register");
		}
		const isMatch = await bcrypt.compare(userInput.password, userCheck.password);
		if (!isMatch) {
			throw createHttpError(httpStatus.FORBIDDEN, "Password is incorrect");
		}

		const payload = {
			id: userCheck.id,
			email: userCheck.email,
		};

		return payload;
	} catch (error) {
		console.error(`Error loginUser: ${error.message}`);
		throw error;
	}
}

/**
 * Registers a new user by creating a user record in the database.
 * @param userInput - The user input containing the email and password.
 * @returns The user payload containing the newly created user's ID and email.
 * @throws If a user with the same email already exists.
 */
export async function registerUser(userInput: IUserInput) {
	const { email, password } = userInput;
	try {
		const userCheck = await UserModel.findOne({ email });
		if (userCheck) {
			throw createHttpError(httpStatus.CONFLICT, `A user with email ${email} already exists`);
		}
		const salt = await bcrypt.genSalt(10);
		const encryptPass = await bcrypt.hash(password, salt);
		const userRecord = await UserModel.create({
			email: email,
			password: encryptPass,
		});

		const payload = {
			id: userRecord.id,
			email: userRecord.email,
		};

		return payload;
	} catch (error) {
		console.error(`Error registerUser: ${error.message}`);
		throw error;
	}
}
