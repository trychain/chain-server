import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export default class Database {
	static connect() {
		mongoose
			.connect(<string>process.env.DATABASE)
			.then(function () {
				console.log("database connected successfully");
			})
			.catch((err: any) => console.log(err));
	}
}
