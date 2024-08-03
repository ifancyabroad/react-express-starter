import { Router } from "express";
import expressAsyncHandler from "express-async-handler";

const pingRouter = Router();

pingRouter.get(
	"/",
	expressAsyncHandler((req, res) => {
		res.status(200).json({ message: "Pong" });
	}),
);

export { pingRouter };
export default pingRouter;
