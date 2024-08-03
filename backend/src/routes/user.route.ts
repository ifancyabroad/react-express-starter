import { Router } from "express";
import { middleware } from "middleware";
import expressAsyncHandler from "express-async-handler";
import { UserSigninDto, UserSignupDto } from "@common/validation/user";
import { login, logout, register, session, user } from "@controllers/user.controller";

/**
 * Express router for handling user-related routes.
 */
const userRouter = Router();

/**
 * GET / - Get user information.
 * Requires user authentication middleware.
 */
userRouter.get("/", middleware.userAuth, expressAsyncHandler(user));

/**
 * GET /session - Get user session information.
 */
userRouter.get("/session", expressAsyncHandler(session));

/**
 * POST /login - User login route.
 * Validates the UserSigninDto middleware.
 */
userRouter.post("/login", middleware.validation(UserSigninDto), expressAsyncHandler(login));

/**
 * DELETE /logout - User logout route.
 */
userRouter.delete("/logout", expressAsyncHandler(logout));

/**
 * PUT /register - User registration route.
 * Validates the UserSignupDto middleware.
 */
userRouter.put("/register", middleware.validation(UserSignupDto), expressAsyncHandler(register));

export { userRouter };
export default userRouter;
