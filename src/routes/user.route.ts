import express from "express";

// validators
import {
	UserPayload,
	UserQuery,
	UserHeaders,
} from "../validators/user.validator";

// gates
import AuthenticationMiddleware from "../middlewares/auth.middleware";

// controller
import UserController from "../controllers/user.controller";

const route = express.Router();

route.get(
	"/",
	[
		UserPayload.fetchUserDetails,
		UserQuery.fetchUserDetails,
		UserHeaders.fetchUserDetails,
	],
	[AuthenticationMiddleware.requireAuthentication],
	[UserController.fetchUserDetails]
);

// route.put(
// 	"/",
// 	[UserPayload.findOne, UserQuery.findOne, UserHeaders.findOne],
// 	[AuthenticationMiddleware.requireAuthentication],
// 	[UserController.findOne]
// );

route.put(
	"/password",
	[
		UserPayload.changePassword,
		UserQuery.changePassword,
		UserHeaders.changePassword,
	],
	[AuthenticationMiddleware.requireAuthentication],
	[UserController.changePassword]
);

export default route;
