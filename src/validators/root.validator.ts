// helpers
import expressJoiValidationHelper from "../helpers/express-joi-validation.helper";

export class RootPayload {
	static root = expressJoiValidationHelper.payloadObject({});
}

export class RootQuery {
	static root = expressJoiValidationHelper.query({});
}

export class RootHeaders {
	static root = expressJoiValidationHelper.headers({});
}
