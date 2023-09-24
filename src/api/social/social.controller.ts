import { Router, Request, Response } from "express";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import {
    IComment,
    PostsById,
    addCommets,
    updateLike,
} from "../../models/social.model";
import { getUserByEmail, updateFollowing } from "../../models/user.model";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";

export const getSinglePost = async (req: Request, res: Response) => {
    // get specific post
    try {
        const { id } = req.params;
        // console.log(` i am here  : ${id}`);
        const result = await PostsById(id);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        res.status(500).send(ApiError(`${(error as Error).message}`));
    }
};

export const postComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const email = (req as ICustomRequest).user_mail;
        const dbUser = await getUserByEmail(email);
        if (!dbUser) {
            return res.status(404).json(ApiError(`user not found!`));
        }
        const commentBody: IComment = {
            time: new Date(),
            text: req.body?.text,
            links: req.body?.links,
            user_id: dbUser._id,
        };
        console.log(`body  : `, req.body);
        const result = await addCommets(id, commentBody);
        // console.log(`result : `, result);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError(`${(error as Error).message}`));
    }
};

export const updatePostReaction = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const email = (req as ICustomRequest).user_mail;
        const result = await updateLike(id, email);
        // console.log(`result : `, result);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError(`${(error as Error).message}`));
    }
};

export const updateUserFollowing = async (req: Request, res: Response) => {
    try {
        const email = (req as ICustomRequest).user_mail;
        const { whom } = req.params;
        const result = await updateFollowing(email, whom);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).json(ApiError((error as Error).message));
    }
};
