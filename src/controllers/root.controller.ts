// packages
import express from "express";

export default class RootController {
	static root(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			response.status(200).json({
				success: true,
				message: "welcome to totp authentication api server",
				data: {
					name: "totp-authenticator-api",
					version: "1.0.2",
				},
			});
		} catch (error) {
			next(error);
		}
	}
}
