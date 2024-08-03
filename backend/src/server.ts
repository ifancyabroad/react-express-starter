import app from "./app";
import { connectToDatabase } from "./database";

const port = process.env.PORT || 8080;

const start = async () => {
	await connectToDatabase();

	app.listen(port, () => {
		console.info(`Server listening on port: ${port}`);
	}).on("error", (err) => {
		console.error(err);
		process.exit(1);
	});
};

start();
