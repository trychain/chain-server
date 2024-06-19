// packages
import express from "express";

// middlewares
import body from "body-parser";
import cookie from "cookie-parser";
import toobusy_js from "toobusy-js";

import cors from "cors";
import hpp from "hpp";
import limit from "express-rate-limit";

// routes
import AuthenticationRoute from "../routes/auth.route";
import UserRoute from "../routes/user.route";
import CodeRoute from "../routes/code.route";
import RootRoute from "../routes/root.route";

// helpers
import ErrorHandlersHelpers from "../middlewares/error-handlers.middleware";

export default class ExpressApplication {
	static application = express();
	static port: any = process.env.PORT;

	static initStandardMiddlewares(): void {
		this.application.use(
			body.json({
				limit: "100kb",
			})
		);

		this.application.use(
			body.urlencoded({
				extended: false,
			})
		);

		this.application.use(cookie());

		this.application.use(ErrorHandlersHelpers.bodyErrorHandler);
	}

	static initSecurityMiddlewares(): void {
		this.application.use(
			cors({
				origin: "*",
				credentials: true,
			})
		);

		// this.application.use(
		// 	csurf({ cookie: true, sessionKey: process.env.SESSIONKEY })
		// );

		this.application.use(hpp());

		this.application.use(
			limit({
				windowMs: 5 * 60 * 1000,
				max: 1000,
				standardHeaders: true,
				legacyHeaders: false,
				message: {
					message: "too many requests",
				},
			})
		);

		this.application.use(function (
			request: express.Request,
			response: express.Response,
			next: express.NextFunction
		) {
			if (toobusy_js()) {
				return response
					.status(503)
					.json({ success: false, message: "server too busy" });
			} else {
				next();
			}
		});
	}

	static initMiddlewares() {
		// custom middlwares
	}

	static initRoutes(): void {
		this.application.use("/auth", AuthenticationRoute);
		this.application.use("/user", UserRoute);
		this.application.use("/code", CodeRoute);
		this.application.use("/", RootRoute);
	}

	static initErrorHandler() {
		this.application.all("*", ErrorHandlersHelpers.notFoundErrorHandler);

		this.application.use(ErrorHandlersHelpers.joiErrorHandler);
		// this.application.use(ErrorHelpers.csrfErrorHandler);
		this.application.use(ErrorHandlersHelpers.jsonWebTokenErrorHandler);
		this.application.use(ErrorHandlersHelpers.internalServerErrorHandler);
	}

	static startExpressApplication(): void {
		this.application.listen(this.port, "0.0.0.0", () => {
			console.log(`application started successfully on port ${this.port}`);
		});
		return;
	}
}
