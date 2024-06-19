// packages
import express from "express";

// validators
import {
	RootPayload,
	RootQuery,
	RootHeaders,
} from "../validators/root.validator";

// controllers
import RootController from "../controllers/root.controller";

const route = express.Router();

route.get(
	"/",
	[RootPayload.root, RootQuery.root, RootHeaders.root],
	[],
	[RootController.root]
);

export default route;
