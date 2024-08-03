import { Response } from "express";
import { loginUser, registerUser } from "@services/user.service";
import { RequestUser } from "@common/types/user";

export async function user(req: RequestUser, res: Response) {
	res.status(200).json({ user: req.user });
}

export async function session(req: RequestUser, res: Response) {
	const session = Boolean(req.session.user);
	res.status(200).json({ session });
}

export async function login(req: RequestUser, res: Response) {
	const user = await loginUser(req.body);
	req.session.user = user;
	req.session.save();
	res.json({ user });
}

export async function logout(req: RequestUser, res: Response) {
	req.session.destroy((err) => {
		if (err) {
			console.error(`Error logout: ${err.message}`);
			throw err;
		} else {
			res.json({});
		}
	});
}

export async function register(req: RequestUser, res: Response) {
	const user = await registerUser(req.body);
	req.session.user = user;
	req.session.save();
	res.json({ user });
}
