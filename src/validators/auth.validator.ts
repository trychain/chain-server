// packages
import joi from "joi";

// helpers
import expressJoiValidationHelper from "../helpers/express-joi-validation.helper";

export class AuthPayload {
	static register = expressJoiValidationHelper.payloadObject({
		email: joi.string().email().trim().max(64).required(),
		password: joi.string().min(8).max(64).required(),
		repeatPassword: joi.string()
			.min(8)
			.max(64)
			.required()
			.valid(joi.ref("password")),
	});
	static login = expressJoiValidationHelper.payloadObject({
		email: joi.string().email().trim().max(64).required(),
		password: joi.string().min(8).max(64).required(),
	});
	static logout = expressJoiValidationHelper.payloadObject({});
	static status = expressJoiValidationHelper.payloadObject({});
}

export class AuthQuery {
	static status = expressJoiValidationHelper.query({});
	static login = expressJoiValidationHelper.query({});
	static register = expressJoiValidationHelper.query({});
	static logout = expressJoiValidationHelper.query({});
}

export class AuthHeaders {
	static status = expressJoiValidationHelper.headers({});
	static login = expressJoiValidationHelper.headers({
		"content-type": joi.string().equal("application/json").required(),
	});
	static register = expressJoiValidationHelper.headers({
		"content-type": joi.string().equal("application/json").required(),
	});
	static logout = expressJoiValidationHelper.headers({});
}
