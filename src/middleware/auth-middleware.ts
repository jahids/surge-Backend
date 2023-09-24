import { NextFunction } from "connect";
import { Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { ICustomRequest } from "../types/interfaces/ICustomRequest";

// @desc Authenticates user and protects routes

export const getTokenLife = () => {
    const envLifeTime = process.env.TOKEN_LIFETIME_M ?? 3;

    const tokenlifeTime = Number(envLifeTime) * 24 * 3600000;
    return tokenlifeTime;
};

export const generateJwt = async (data: any) => {
    const tokenlifeTime = getTokenLife();
    const JWT_SECRET = process.env.JWT_SECRET as Secret;

    const signedToken = jwt.sign({ ...data }, JWT_SECRET, {
        expiresIn: tokenlifeTime,
    });

    return signedToken;
};

export const verifyJwt = (token: string): any => {
    const JWT_SECRET = process.env.JWT_SECRET as Secret;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
};

export const AuthMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const decoded = verifyJwt(req.cookies?.token);
        (req as ICustomRequest).user_mail = decoded?.email;
        (req as ICustomRequest).alpaca_id = decoded?.id;
        next();
    } catch (error) {
        return res.status(403).json(ApiError("jwt not verified!"));
    }
};
