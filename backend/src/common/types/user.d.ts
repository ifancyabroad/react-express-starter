import { Request } from "express";

export interface IUserInput {
	id?: string;
	email: string;
	password: string;
}

export interface RequestUser extends Request {
	user?: IUserInput;
}
