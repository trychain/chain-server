// packages
import joi from "joi";

// helpers
import expressJoiValidationHelper from "../helpers/express-joi-validation.helper";

export class UserPayload {
	static fetchUserDetails = expressJoiValidationHelper.payloadObject({});
	static changePassword = expressJoiValidationHelper.payloadObject({
		currentPassword: joi.string().required(),
		newPassword: joi.string().min(8).max(64).required(),
	});
	static updateUserDetails = expressJoiValidationHelper.payloadObject({
		email: joi.string().email().required(),
	});
}

export class UserQuery {
	static fetchUserDetails = expressJoiValidationHelper.query({});
	static changePassword = expressJoiValidationHelper.query({});
	static updateUserDetails = expressJoiValidationHelper.query({});
}

export class UserHeaders {
	static fetchUserDetails = expressJoiValidationHelper.headers({});
	static updateUserDetails = expressJoiValidationHelper.headers({});
	static changePassword = expressJoiValidationHelper.headers({});
}
