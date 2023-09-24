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

export const socialRouter = Router();

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

socialRouter.get(`/post/:id`, async (req: Request, res: Response) => {
    // get specific post
    try {
        const { id } = req.params;
        console.log(` i am here  : ${id}`);
        const result = await PostsById(id);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        res.status(500).send(ApiError(`${(error as Error).message}`));
    }
});

//delete a post
socialRouter.delete(`/post/:id`, (req: Request, res: Response) => {
    // get specific post
    return res.status(200).json(ApiSuccess(`social-feed for a user!`));
});

//add comments

socialRouter.post(`/post/:id/comment`, async (req: Request, res: Response) => {
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
});

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
socialRouter.get(`/post/:id/like`, async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const email = (req as ICustomRequest).user_mail;
        const result = await updateLike(id, email);
        // console.log(`result : `, result);
        return res.status(200).json(ApiSuccess(result));
    } catch (error) {
        return res.status(500).send(ApiError(`${(error as Error).message}`));
    }
});

// socialRouter.post(`/:postId/comments`, async (req: Request, res: Response) => {
//     // console.log(`body  : `, req.body);
//     res.status(200).json(ApiError(req.body));
// });
// socialRouter.get(`/:postId/comments`, async (req: Request, res: Response) => {
//     console.log(`body  : `, req.body);
// });
// socialRouter.get(`/post/:postId`, async (req: Request, res: Response) => {
//     console.log(`body  : `, req.body);
// });
