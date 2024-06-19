// packages
import express from "express";

// schemas
import { IUserDocument } from "../src/models/user.model";

declare global {
	namespace Express {
		export interface Request {
			user: IUserDocument;
		}
	}
}

declare module "express-session" {
	export interface SessionData {
		initialized?: boolean;
		user?: string;
	}
}
