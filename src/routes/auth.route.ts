// packages
import express from "express";

// middlewares
import AuthMiddleware from "../middlewares/auth.middleware";

// validators
import {
	AuthPayload,
	AuthQuery,
	AuthHeaders,
} from "../validators/auth.validator";

// controller
import AuthController from "../controllers/auth.controller";

const route = express.Router();

route.post(
	"/login",
	[AuthPayload.login, AuthQuery.login, AuthHeaders.login],
	[],
	[],
	[AuthController.login]
);

route.post(
	"/register",
	[AuthPayload.register, AuthQuery.register, AuthHeaders.register],
	[],
	[],
	[AuthController.register]
);

export default route;
