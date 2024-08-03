import { Response, NextFunction, RequestHandler } from "express";
import { RequestUser } from "@common/types/user";
import httpStatus from "http-status-codes";
import expressAsyncHandler from "express-async-handler";
import createError from "http-errors";

/**
 * Middleware to check if user is authenticated
 *
 * @throws 400 - No session, authorization denied
 */
const userAuth: RequestHandler = expressAsyncHandler(async (req: RequestUser, res: Response, next: NextFunction) => {
	if (req.session.user) {
		next();
	} else {
		next(createError(httpStatus.BAD_REQUEST, "No session, authorization denied"));
	}
});

export { userAuth };
export default userAuth;
