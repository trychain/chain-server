// packages
import express from "express";

// validators
import {
	CodePayload,
	CodeHeaders,
	CodeQuery,
} from "../validators/code.validator";

// middlewares
import AuthenticationMiddlewares from "../middlewares/auth.middleware";

// controllers
import CodeController from "../controllers/code.controller";

const route = express.Router();

route.get(
	"/",
	[
		CodePayload.fetchAllCodes,
		CodeHeaders.fetchAllCodes,
		CodeQuery.fetchAllCodes,
	],
	[AuthenticationMiddlewares.requireAuthentication],
	[CodeController.fetchAllCodes]
);

route.get(
	"/:codeId",
	[CodePayload.fetchCode, CodeHeaders.fetchCode, CodeQuery.fetchCode],
	[AuthenticationMiddlewares.requireAuthentication],
	[CodeController.fetchCode]
);

route.post(
	"/",
	[CodePayload.createCode, CodeHeaders.createCode, CodeQuery.createCode],
	[AuthenticationMiddlewares.requireAuthentication],
	[CodeController.createCode]
);

route.put(
	"/:codeId",
	[CodePayload.updateCode, CodeHeaders.updateCode, CodeQuery.updateCode],
	[AuthenticationMiddlewares.requireAuthentication],
	[CodeController.updateCode]
);

route.delete(
	"/:codeId",
	[CodePayload.deleteCode, CodeHeaders.deleteCode, CodeQuery.deleteCode],
	[AuthenticationMiddlewares.requireAuthentication],
	[CodeController.deleteCode]
);

export default route;
