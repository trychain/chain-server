import ExpressValidator from "express-joi-validation";
import Joi from "joi";

export default class ExpressValidatorLibrary {
	private static validator = ExpressValidator.createValidator({
		passError: true,
	});

	static payloadObject(object: any) {
		return this.validator.body(Joi.object(object));
	}
	static payloadArray(object: any) {
		return this.validator.body(Joi.array().items(Joi.object(object)));
	}

	static query(object: any) {
		return this.validator.query(Joi.object(object));
	}
	static headers(object: any) {
		return this.validator.headers(Joi.object(object));
	}
}
