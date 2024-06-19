// packages
import express from "express";

// models
import CodeModel from "../models/code.model";

export default class CodeController {
	static async fetchCode(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// middlewares
		const user = request.user;

		// queries
		const codeId = request.params.codeId;

		try {
			const code = await CodeModel.findOneByIdAndUserId({
				codeId: codeId,
				userId: user.id,
			});

			if (!code) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "code not found",
				});
				return;
			}

			response.status(200).json({
				status: 200,
				success: true,
				message: "code found successully",
				data: code,
			});
		} catch (error) {
			next(error);
		}
	}

	static async fetchAllCodes(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// middlewares
		const user = request.user;

		try {
			const codes = await CodeModel.findManyByUserId({
				userId: user.id,
			});

			response.status(200).json({
				status: 200,
				success: true,
				message: "codes found successully",
				data: codes,
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateCode(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// parameters
		const codeId = request.params.codeId;

		// payload
		const issuer = request.body.issuer;
		const label = request.body.label;
		const secret = request.body.secret;
		const algorithm = request.body.algorithm;
		const period = request.body.period;
		const digits = request.body.digits;

		// middlewares
		const user = request.user;

		try {
			const code = await CodeModel.updateOneByUserId({
				codeId: codeId,
				userId: user.id,
				issuer: issuer,
				label: label,
				secret: secret,
				algorithm: algorithm,
				period: period,
				digits: digits,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "code created successfully",
				data: code,
			});
		} catch (error) {
			next(error);
		}
	}
	static async createCode(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// payload
		const issuer = request.body.issuer;
		const label = request.body.label;
		const secret = request.body.secret;
		const algorithm = request.body.algorithm;
		const period = request.body.period;
		const digits = request.body.digits;

		// middlewares
		const user = request.user;

		try {
			const code = await CodeModel.createOne({
				userId: user.id,
				issuer: issuer,
				label: label,
				secret: secret,
				algorithm: algorithm,
				period: period,
				digits: digits,
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "code created successfully",
				data: code,
			});
		} catch (error) {
			next(error);
		}
	}
	static async deleteCode(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// parameters
		const codeId = request.params.codeId;

		// middlewares
		const user = request.user;

		try {
			const code = await CodeModel.findOne({
				id: codeId,
				user: user.id,
			});

			if (!code) {
				response.status(404).json({
					status: 404,
					success: false,
					message: "code not found",
				});
				return;
			}

			await code.deleteOne();

			response.status(201).json({
				status: 201,
				success: true,
				message: "code deleted successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}
