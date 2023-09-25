import { Router, Request, Response } from "express";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";

import {
    IComment,
    MultipleUserPosts,
    PostsById,
    PostsByUserId,
    addCommets,
    updateLike,
} from "../../models/social.model";
import {
    allUser,
    getUserByEmail,
    updateFollowing,
} from "../../models/user.model";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import { getAllClients } from "../../services/Broker.service";
import { getUsersFollowing } from "./social.service";

export const getPeople = async (req: Request, res: Response) => {
    try {
        const userList = await getAllClients();

        const finalList = await getUsersFollowing(userList);

        // console.log(`user list : `, userList);
        return res.status(200).json(ApiSuccess(finalList));
    } catch (error) {
        return res.status(500).json(ApiError(error));
    }
};

export const getSinglePost = async (req: Request, res: Response) => {
    // get specific post
    try {
        const { id } = req.params;
        // console.log(` i am here  🔥🔥: ${id}`);
        const result = await PostsById(id);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        res.status(500).send(ApiError(`${(error as Error).message}`));
    }
};

export const getUserPosts = async (req: Request, res: Response) => {
    // get specific post
    try {
        const { userId } = req.params;
        // console.log(` i am here  : ${userId}`);
        const result = await PostsByUserId(userId);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        res.status(500).send(ApiError(`${(error as Error).message}`));
    }
};
export const getUserFollowingPosts = async (req: Request, res: Response) => {
    // get specific post
    try {
        const email = (req as ICustomRequest).user_mail;
        // console.log(` i am here 👗🥻  : ${email}`);
        const result = await getUserByEmail(email);

        if (!result) {
            return res.status(404).json(ApiError(`user email not found in DB`));
        }
        const following = result?.following;
        let finalResult: any = [];
        if (following) {
            finalResult = await MultipleUserPosts(following);
        }

        return res.status(200).json(ApiSuccess(finalResult.flat(Infinity)));
    } catch (error) {
        res.status(400).send(ApiError(`${(error as Error).message}`));
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
