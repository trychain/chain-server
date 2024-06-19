// packages
import joi from "joi";
import validator from "validator";

// helpers
import expressJoiValidationHelper from "../helpers/express-joi-validation.helper";

export class CodePayload {
	static fetchAllCodes = expressJoiValidationHelper.payloadObject({});
	static fetchCode = expressJoiValidationHelper.payloadObject({});
	static createCode = expressJoiValidationHelper.payloadObject({
		label: joi.string().max(255).required(),
		issuer: joi.string().max(255).required(),
		secret: joi
			.string()
			.max(255)
			.required()
			.custom((value, helper) => {
				if (!validator.isBase32(value)) {
					return helper.message("secret must be base32 encoded" as any);
				}

				return true;
			}),
		algorithm: joi
			.string()
			.valid(
				"SHA1",
				"SHA224",
				"SHA256",
				"SHA384",
				"SHA512",
				"SHA3-224",
				"SHA3-256",
				"SHA3-384",
				"SHA3-512"
			)
			.required(),
		period: joi.string().valid("15", "30", "60", "120").required(),
		digits: joi.string().required(),
	});
	static updateCode = expressJoiValidationHelper.payloadObject({
		label: joi.string().max(255).required(),
		issuer: joi.string().max(255).required(),
		secret: joi.string().max(255).required(),
		algorithm: joi
			.string()
			.valid(
				"SHA1",
				"SHA224",
				"SHA256",
				"SHA384",
				"SHA512"
				// "SHA3-224",
				// "SHA3-256",
				// "SHA3-384",
				// "SHA3-512"
			)
			.required(),
		period: joi.string().valid("15", "30", "60", "120").required(),
		digits: joi.string().required(),
	});
	static deleteCode = expressJoiValidationHelper.payloadObject({});
}

export class CodeQuery {
	static fetchAllCodes = expressJoiValidationHelper.query({
		search: joi.string().max(255).optional(),
		folde: joi.string().max(255).optional(),
		sort: joi.string().valid("ascending", "descending").optional(),
		excludeFolders: joi.string().max(255).optional(),
	});
	static fetchCode = expressJoiValidationHelper.query({});
	static createCode = expressJoiValidationHelper.query({});
	static updateCode = expressJoiValidationHelper.query({});
	static deleteCode = expressJoiValidationHelper.query({});
}

export class CodeHeaders {
	static fetchAllCodes = expressJoiValidationHelper.headers({});
	static fetchCode = expressJoiValidationHelper.headers({});
	static createCode = expressJoiValidationHelper.headers({
		"content-type": joi.string().equal("application/json").required(),
	});
	static updateCode = expressJoiValidationHelper.headers({
		"content-type": joi.string().equal("application/json").required(),
	});
	static deleteCode = expressJoiValidationHelper.headers({});
}
