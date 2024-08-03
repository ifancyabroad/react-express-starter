import { Router } from "express";
import { pingRouter } from "./ping.route";
import { userRouter } from "./user.route";
const appRouter = Router();

appRouter.use("/ping", pingRouter);
appRouter.use("/auth", userRouter);

export { appRouter };
export default appRouter;
