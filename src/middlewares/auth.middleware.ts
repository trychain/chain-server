// packages
import express from "express";
import lodash from "lodash";

// models
import UserModel from "../models/user.model";

// helpers
import JsonwebtokenHelper from "../helpers/jsonwebtoken.helper";

export default class AuthenticationMiddlewares {
	static async requireAuthentication(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const authorization = request.headers.authorization?.split(" ")[1];

		try {
			if (!authorization) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "authentication required",
				});
				return;
			}

			const decodeJwtToken = JsonwebtokenHelper.decode({
				token: authorization,
			});

			if (!decodeJwtToken) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "authentication required",
				});
				return;
			}

			const user = await UserModel.findOneById({
				userId: decodeJwtToken.userId,
			});

			if (!user) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "authentication required",
				});
				return;
			}

			request.user = user;
			next();
		} catch (error) {
			next(error);
		}
	}

	static async requireNotAuthentication(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const authorization = request.headers.authorization.split(" ")[1];

		try {
			if (authorization) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "deauthentication required",
				});
				return;
			}
			next();
		} catch (error) {
			next(error);
		}
	}

	static rolesAuthentication({ roles }) {
		return async function (
			request: express.Request,
			response: express.Response,
			next: express.NextFunction
		) {
			// user
			const user = request.user;

			try {
				const validate = !lodash(user.roles).intersection(roles).isEmpty();

				if (!validate) {
					response.status(403).json({
						status: 403,
						success: false,
						message: "cannot access on this endpoint",
					});
					return;
				}

				next();
			} catch (error) {
				next(error);
			}
		};
	}
}
