// packages
import express from "express";
import bcrypt from "bcrypt";
import lodash from "lodash";

// models
import UserModel from "../models/user.model";
import JsonwebtokenHelper from "../helpers/jsonwebtoken.helper";

export default class AuthenticationController {
	static async register(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		const email = request.body.email;
		const password = request.body.password;

		try {
			const validateEmail = await UserModel.findOneByEmail({
				email: email,
			});
			if (validateEmail) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "email already used",
				});
				return;
			}

			const user = await UserModel.create({
				email: email,
				password: password,
			});

			const token = JsonwebtokenHelper.encode({
				payload: {
					userId: user.id,
				},
			});

			response.status(201).json({
				status: 201,
				success: true,
				message: "user created successfully",
				data: token,
			});
		} catch (error) {
			next(error);
		}
	}

	static async login(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const email = request.body.email;
		const password = request.body.password;

		try {
			const user = await UserModel.findOneByEmail({
				email: email,
			}).select({
				password: true,
			});

			if (!user) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "email or password is wrong",
				});
				return;
			}

			const validatePassword = bcrypt.compareSync(password, user.password);
			if (!validatePassword) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "email or password is wrong",
				});
				return;
			}

			const token = JsonwebtokenHelper.encode({
				payload: {
					userId: user.id,
				},
			});

			response.status(200).json({
				status: 200,
				success: true,
				message: "login successfully",
				data: token,
			});
		} catch (error) {
			next(error);
		}
	}

	static async status(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// user
		const user = request.user;

		try {
			response.status(200).json({
				status: 200,
				success: true,
				message: "user authentication status imported successfully",
				data: !!user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async logout(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		try {
			request.session.user = String();

			response.status(202).json({
				status: 202,
				success: true,
				message: "logout successfully",
			});
		} catch (error) {
			next(error);
		}
	}
}
