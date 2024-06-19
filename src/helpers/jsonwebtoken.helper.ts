// packages
import jsonwebtoken from "jsonwebtoken";

export default class JsonwebtokenHelper {
	static encode({ payload }) {
		return jsonwebtoken.sign(payload, process.env.JSONWEBTOKEN_PRIVATE_KEY, {
			expiresIn: 7 * 24 * 60 * 60 * 1000,
		});
	}

	static decode({ token }) {
		return jsonwebtoken.verify(token, process.env.JSONWEBTOKEN_PRIVATE_KEY) as any;
	}
}
