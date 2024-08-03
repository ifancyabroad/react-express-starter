import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import MongoStore from "connect-mongo";
import { middleware } from "./middleware";
import appRouter from "@routes/index";
import dotenv from "dotenv";

const envFound = dotenv.config();
if (envFound.error) {
	console.info("Couldn't find .env file");
}

console.debug(`MODE ENV ${process.env.NODE_ENV}`);

const app = express();

/*  CORS middleware  */
app.use(cors({ origin: true }));

/*  JSON middleware  */
app.use(express.json());

/*  Body parser middleware  */
app.use(express.urlencoded({ extended: false }));

/*  Security middleware  */
app.use(helmet());

/*  Session middleware  */
if (process.env.JWT_SECRET && process.env.MONGODB_URI) {
	const sessionConfig = session({
		name: "sid",
		secret: process.env.JWT_SECRET,
		cookie: {
			httpOnly: true,
			secure: false,
			maxAge: 1000 * 60 * 60 * 7,
		},
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: process.env.MONGODB_URI,
		}),
	});
	app.use(sessionConfig);
}

/*  Proxy rules */
app.set("trust proxy", true);

/*  Routes  */
app.use("/api", appRouter);

/*  404 middleware  */
app.use(middleware.notFound);

/*  Error middleware  */
app.use(middleware.errorRequest);

export { app };
export default app;
