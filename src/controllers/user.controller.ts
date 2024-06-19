// pacakges
import express from "express";
import lodash from "lodash";
import bcrypt from "bcrypt";

// modals
import UserModel from "../models/user.model";

export default class UserController {
	static async fetchUserDetails(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// session
		const user = request.user;

		try {
			const _user = lodash(user).pick(["fname", "lname", "email", "roles"]);

			response.status(200).json({
				status: 200,
				success: true,
				message: "user imported successfully",
				data: _user,
			});
		} catch (error) {
			next(error);
		}
	}

	static async changePassword(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const currentPassword = request.body.currentPassword;
		const newPassword = request.body.newPassword;

		// middlewares
		const user = request.user;

		try {
			const _user = await UserModel.findOneById({
				userId: user.id,
			}).select({
				password: true,
			});

			const validatePassword = bcrypt.compareSync(currentPassword, _user.password);
			if (!validatePassword) {
				response.status(401).json({
					status: 401,
					success: false,
					message: "password is wrong",
				});
				return;
			}

			if (currentPassword === newPassword) {
				response.status(400).json({
					status: 400,
					success: false,
					message: "new password cannot be the same of old password",
				});
				return;
			}

			await UserModel.changePassword({
				userId: user.id,
				password: newPassword,
			});

			response.status(200).json({
				status: 200,
				success: true,
				message: "user password changed successfully",
			});
		} catch (error) {
			next(error);
		}
	}

	static async updateUserDetails(
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
	) {
		// params
		const email = request.body.email;

		// middlewares
		const user = request.user;

		try {
			const updateUser = await UserModel.updateOneByUserId({
				userId: user.id,
				email: email,
			});

			response.status(200).json({
				status: 200,
				success: true,
				message: "user updated successfully",
				data: updateUser,
			});
		} catch (error) {
			next(error);
		}
	}
}
