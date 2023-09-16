import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel, { getUserByEmail } from "../../models/user.model";
import { ApiSuccess } from "../../utils/ApiSuccess";

import { ApiError } from "../../utils/ApiError";

// import { SuccessRequest } from "../../utils/ApiSuccess";

export const signupController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: `email/password is required`,
            });
        }
        // check if user already exist
        const user = await getUserByEmail(email);
        if (user?.email) {
            return res.status(400).json(ApiError("user already exist!"));
        }
        // salt password
        const saltedPass = await bcrypt.hash(
            password,
            Number(process.env.PASSWORD_SALT_ROUND) ?? 10,
        );

        // console.log(`salted pass : `, saltedPass);

        const dbUser = await userModel.create({
            email: email,
            password: saltedPass,
        });

        if (dbUser?.email) {
            return res.status(200).json(ApiSuccess(true));
        } else {
            return res
                .status(400)
                .json(ApiError("couldn't save user in the db"));
        }
        // add the user in the db
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
        // res.status(500).json({ message: error });
    }
};
