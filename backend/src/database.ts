import mongoose from "mongoose";

const db = process.env.MONGODB_URI;

export const connectToDatabase = async () => {
	try {
		if (!db) {
			throw new Error("MongoDB URI is not defined");
		}
		const mongoConnection = await mongoose.connect(db);
		console.info("MongoDB has been connected");
		return mongoConnection.connection.db;
	} catch (err) {
		console.error(err.message);
	}
};
