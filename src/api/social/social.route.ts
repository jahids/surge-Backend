import { Router, Request, Response } from "express";
import { ApiSuccess } from "../../utils/ApiSuccess";
import { ApiError } from "../../utils/ApiError";
import {
    IComment,
    PostsById,
    addCommets,
    updateLike,
} from "../../models/social.model";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import { getUserByEmail } from "../../models/user.model";
import {
    getPeople,
    getSinglePost,
    getSocialOrder,
    getUserFollowingPosts,
    getUserPosts,
    postComment,
    updatePostReaction,
    updateUserFollowing,
} from "./social.controller";

export const socialRouter = Router();

//get list of social users
socialRouter.get(`/people`, getPeople);

//get social feed of a  user
socialRouter.get(`/social-feed`, (req: Request, res: Response) => {
    // social feed for a user
    return res.status(200).json(ApiSuccess(`social-feed for a user!`));
});

//create a post

socialRouter.post(`/post`, async (req: Request, res: Response) => {
    console.log(`body  : `, req.body);
});

//get a post
socialRouter.get(`/post/:id`, getSinglePost);
//get posts of a user
socialRouter.get(`/post/user/:userId`, getUserPosts);
//get list of a users following post
socialRouter.get(`/posts/following`, getUserFollowingPosts);
//delete a post
socialRouter.delete(`/post/:id`, (req: Request, res: Response) => {
    // get specific post
    return res.status(200).json(ApiSuccess(`social-feed for a user!`));
});

//add comments

socialRouter.post(`/post/:id/comment`, postComment);

//get  comments
socialRouter.get(`/post/:id/comment`, async (req: Request, res: Response) => {
    console.log(`body  : `, req.body);
});

//delete comments
socialRouter.delete(
    `/post/:id/comment`,
    async (req: Request, res: Response) => {
        console.log(`body  : `, req.body);
    },
);

//like/dislike
socialRouter.get(`/post/:id/like`, updatePostReaction);

// user following another user
socialRouter.get(`/new-following/:whom`, updateUserFollowing);

//get social order
socialRouter.get(`/order`, getSocialOrder);
