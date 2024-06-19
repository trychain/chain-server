// packages
import mongoose, { HydratedDocument } from "mongoose";
import crypto from "crypto";

export interface ICodeDocument {
	id: string;
	issuer: string;
	label: string;
	secret: string;
	algorithm: string;
	period: string;
	digits: string;
	user: string;
}

export interface ICodeMethods {}

export interface ICodeStatics
	extends mongoose.Model<ICodeDocument, ICodeStatics, ICodeMethods> {
	findOneByIdAndUserId({
		userId,
		codeId,
	}): mongoose.QueryWithHelpers<ICodeDocument, ICodeMethods>;
	findManyByUserId({
		userId,
	}): mongoose.QueryWithHelpers<ICodeDocument, ICodeMethods>;
	createOne({
		userId,
		issuer,
		label,
		secret,
		algorithm,
		period,
		digits,
	}): mongoose.QueryWithHelpers<ICodeDocument, ICodeMethods>;
	updateOneByUserId({
		codeId,
		userId,
		issuer,
		label,
		secret,
		algorithm,
		period,
		digits,
	}): mongoose.QueryWithHelpers<ICodeDocument, ICodeMethods>;
}

export const CodeModel = new mongoose.Schema<
	ICodeDocument,
	ICodeStatics,
	ICodeMethods
>(
	{
		id: {
			type: String,
			required: true,
			unique: true,
		},
		user: {
			type: String,
			required: true,
		},
		issuer: {
			type: String,
			required: true,
			index: true,
		},
		label: {
			type: String,
			required: true,
		},
		secret: {
			type: String,
			required: true,
		},
		algorithm: {
			type: String,
			required: true,
		},
		period: {
			type: String,
			required: true,
		},
		digits: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

CodeModel.static("findOneByIdAndUserId", function ({ codeId, userId }) {
	const query = this.findOne({
		id: codeId,
		user: userId,
	});

	query.select({
		_id: false,
		id: true,
		issuer: true,
		label: true,
		algorithm: true,
		period: true,
		digits: true,
		secret: true,
		folder: true,
	});

	return query;
});

CodeModel.static("findManyByUserId", function ({ userId }) {
	const query = this.find({ user: userId });

	query.select({
		_id: false,
		id: true,
		issuer: true,
		label: true,
		algorithm: true,
		period: true,
		digits: true,
		secret: true,
		folder: true,
	});

	query.sort({
		createdAt: -1,
	});

	return query;
});

CodeModel.static(
	"createOne",
	async function ({
		userId,
		issuer,
		label,
		secret,
		algorithm,
		period,
		digits,
	}) {
		const code = await this.create({
			user: userId,
			issuer: issuer,
			label: label,
			secret: secret,
			algorithm: algorithm,
			period: period,
			digits: digits,
		});

		const query = this.findOneByIdAndUserId({
			codeId: code.id,
			userId: userId,
		});

		return query;
	}
);

CodeModel.static(
	"updateOneByUserId",
	async function ({
		codeId,
		userId,
		issuer,
		label,
		secret,
		algorithm,
		period,
		digits,
	}) {
		const code = await this.updateOne(
			{ id: codeId, user: userId },
			{
				issuer: issuer,
				label: label,
				secret: secret,
				algorithm: algorithm,
				period: period,
				digits: digits,
			}
		);

		const query = this.findOneByIdAndUserId({
			codeId: codeId,
			userId: userId,
		});

		return query;
	}
);

CodeModel.pre("validate", function (next) {
	this.id = crypto.randomBytes(6).toString("hex");

	return next();
});

export default mongoose.model<ICodeDocument, ICodeStatics>("code", CodeModel);
