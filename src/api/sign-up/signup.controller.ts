import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel, { getUserByEmail } from "../../models/user.model";
import { ApiSuccess } from "../../utils/ApiSuccess";

import { ApiError } from "../../utils/ApiError";
import { generateJwt, getTokenLife } from "../../middleware/auth-middleware";
import { checkPassword, encryptPassword } from "../../helpers/password.helper";

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
        const saltedPass = await encryptPassword(password);
        // console.log(`salted pass : `, saltedPass);

        const dbUser = await userModel.create({
            email: email,
            password: saltedPass,
        });

        if (dbUser?.email) {
            const signedToken = await generateJwt({
                email: email,
                dbId: dbUser._id,
            });
            res.cookie("token", signedToken, {
                maxAge: getTokenLife(),
            });
            return res.status(200).json(
                ApiSuccess({
                    token: signedToken,
                    email: email,
                    dbId: dbUser._id,
                }),
            );
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

export const checkUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({
                message: `email/password is required`,
            });
        }
        // check if user already exist
        const user = await getUserByEmail(email);

        if (user?.email) {
            return res
                .status(200)
                .json(ApiSuccess(true, "user already exists!"));
        }

        return res.status(400).json(ApiError("user doesn't exist!"));

        // add the user in the db
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
        // res.status(500).json({ message: error });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.status(400).json({
                message: `email/password is required`,
            });
        }
        // check if user  exist
        const dbUser = await getUserByEmail(email);
        if (dbUser?.email) {
            //now match password
            const matched = await checkPassword(password, dbUser.password);
            if (matched) {
                return res.status(401).json(ApiError(`password didn't match!`));
            }
            const tokenObject: any = { email: email, dbId: dbUser._id };
            //check if user completed multisteps
            let multiStepCompleted = false;
            if (dbUser?.alpaca_id) {
                //not completed
                multiStepCompleted = true;
                tokenObject.id = dbUser.alpaca_id;
            }

            //generate jwt
            const signedToken = await generateJwt(tokenObject);
            res.cookie("token", signedToken, {
                maxAge: getTokenLife(),
            });
            return res.status(200).json(
                ApiSuccess({
                    multiStepCompleted,
                    token: signedToken,
                    email: dbUser.email,
                    dbId: dbUser._id,
                }),
            );
        }

        return res.status(400).json(ApiError("user doesn't exist!"));

        // add the user in the db
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
        // res.status(500).json({ message: error });
    }
};

export const signout = async (req: Request, res: Response) => {
    try {
        res.clearCookie("token");
        return res.sendStatus(201);

        // add the user in the db
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
        // res.status(500).json({ message: error });
    }
};
