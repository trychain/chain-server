import express from "express";

export default class ErrorHandlersHelpers {
	static bodyErrorHandler(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (error instanceof SyntaxError) {
			response.status(400).json({
				status: 400,
				success: false,
				message: "invalid body type",
			});
		} else next(error);
	}

	static csrfErrorHandler(
		error: any,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (error.code === "EBADCSRFTOKEN") {
			response.status(403).json({
				status: 403,
				success: false,
				message: "invalid csrf token",
			});
		} else next(error);
	}

	static internalServerErrorHandler(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		response.status(500).json({
			status: 400,
			success: false,
			message: "internal server error",
			data: {
				name: error.name,
				message: error.message,
				stack: error.stack.replace(/  /g, "").split("\n"),
			},
		});
	}

	static joiErrorHandler(
		error: any,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (error.error && error.error.isJoi) {
			response.status(400).json({
				status: 400,
				success: false,
				message: error.error.details[0].message,
			});
		} else next(error);
	}

	static jsonWebTokenErrorHandler(
		error: Error,
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		if (
			error.name === "TokenExpiredError" ||
			error.name === "JsonWebTokenError" ||
			error.name === "NotBeforeError"
		) {
			response.status(401).json({
				status: 401,
				success: false,
				message: "authentication required",
			});
			return;
		} else next(error);
	}

	static notFoundErrorHandler(
		request: express.Request,
		response: express.Response
	) {
		response.status(404).json({
			status: 400,
			success: false,
			message: "endpoint not found",
		});
	}
}
