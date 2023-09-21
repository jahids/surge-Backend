import { Request, Response } from "express";
import { generateOTP, sendOTP } from "./mailer.service";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { deleteOtp, getOtpByEmail, setOtp } from "../../models/otp.model";
const optObj = {};

export const createOtp = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res
                .status(401)
                .json(ApiSuccess(null, `email doesn't exist.`));
        }
        //generate otp
        const otp = generateOTP();
        //send otp
        const otpResult = await sendOTP(email, otp);
        //now save the otp
        const dbRes = await setOtp(email, otp);
        return res
            .status(200)
            .json(ApiSuccess({ email: email }, "OTP Sent!, Check Your Email."));
    } catch (error) {
        return res.status(500).send("failed to generate otp");
    }
};

export const verifyOtp = async (req: Request, res: Response) => {
    const envLifeTime = process.env.TOKEN_LIFETIME_M ?? 3;

    const tokenlifeTime = Number(envLifeTime) * 24 * 3600000;

    try {
        const { email, otp: oldOtp } = req.body;
        if (!email || !oldOtp) {
            return res.status(401).json(ApiError(`email/otp not found.`));
        }

        const dbOtp = await getOtpByEmail(email);

        if (dbOtp?.otp == oldOtp) {
            //sign jwt
            const JWT_SECRET = process.env.JWT_SECRET as Secret;
            const signedToken = jwt.sign({ email: email }, JWT_SECRET, {
                expiresIn: tokenlifeTime,
            });

            res.cookie("token", signedToken, {
                maxAge: tokenlifeTime,
            });

            await deleteOtp(email);

            return res
                .status(200)
                .json(
                    ApiSuccess(
                        { token: signedToken, email: email },
                        "otp matched",
                    ),
                );
        }

        return res.status(400).json(ApiError("otp didn't match."));
    } catch (error) {
        return res.status(500).send(ApiError("failed to generate otp"));
    }
};
