// packages
import mongoose, { HydratedDocument } from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

export interface IUserDocument {
	id: string;
	email: string;
	roles?: string[];
	password: string;
}

export interface IUserMethods {}

export interface IUserStatics
	extends mongoose.Model<IUserDocument, IUserStatics, IUserMethods> {
	findOneById({
		userId,
	}): mongoose.QueryWithHelpers<IUserDocument, IUserMethods>;
	findOneByEmail({
		email,
	}): mongoose.QueryWithHelpers<IUserDocument, IUserMethods>;
	updateOneByUserId({
		userId,
		email,
	}): mongoose.QueryWithHelpers<IUserDocument, IUserMethods>;
	changePassword({
		userId,
		password,
	}): mongoose.QueryWithHelpers<IUserDocument, IUserMethods>;
}

export const UserModel = new mongoose.Schema<
	IUserDocument,
	IUserStatics,
	IUserMethods
>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: mongoose.Schema.Types.String,
			required: true,
			unique: true,
		},
		roles: {
			type: [mongoose.Schema.Types.String],
			required: false,
			default: new Array(),
		},
		password: {
			type: mongoose.Schema.Types.String,
			required: true,
		},
	},
	{ timestamps: true }
);

UserModel.static("findOneById", function ({ userId }) {
	const query = this.findOne({ id: userId });

	query.select({
		_id: false,
		id: true,
		fname: true,
		lname: true,
		email: true,
		roles: true,
	});

	return query;
});

UserModel.static("findOneByEmail", function ({ email }) {
	const query = this.findOne({ email: email });

	query.select({
		_id: false,
		id: true,
		fname: true,
		lname: true,
		email: true,
		roles: true,
	});

	return query;
});

UserModel.static("updateOneByUserId", function ({ userId, email }) {
	const query = this.updateOne({ id: userId }, { email: email });

	query.select({
		_id: false,
		id: true,
		fname: true,
		lname: true,
		email: true,
		roles: true,
	});

	return query;
});

UserModel.static("changePassword", function ({ userId, password }) {
	const encryptPassword = bcrypt.hashSync(password, 10);
	const query = this.updateOne({ id: userId }, { password: encryptPassword });

	query.select({
		_id: false,
		id: true,
		fname: true,
		lname: true,
		email: true,
		roles: true,
	});

	return query;
});

UserModel.pre("validate", async function (next) {
	this.id = crypto.randomBytes(6).toString("hex");
	this.password = bcrypt.hashSync(this.password, 10);

	return next();
});

export default mongoose.model<IUserDocument, IUserStatics, IUserMethods>(
	"user",
	UserModel
);
