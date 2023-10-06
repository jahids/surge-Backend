/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import {  findTopInvestors, updateFollowing ,addInvesment, updateUserAboutMe} from "../../models/user.model";
import { ApiSuccess } from "../../utils/ApiSuccess";

export const getUserById = async (req: Request, res: Response) => {
	
	res.send("test");
};

export const getSelf = async (req : Request, res  : Response)=>{
	
};

export const getTopInvestors = async (req : Request,res : Response)=>{
	try {
		const {limit} = req.query;
		let finalLimit = Number(limit);
		if(!limit){
			finalLimit = 5;
		}
		const topG = await findTopInvestors(finalLimit)
		return res.status(200).json(ApiSuccess(topG));
		
	} catch (error) {
		return res.status(500).json(ApiError(error));
	}
}

export const postNewAboutMe = async (req : Request,res : Response)=>{
	try {
		const {about_me} = req.body;
		console.log(`req body : `,req.body);
		console.log(`about_me`,req.body?.about_me);
		const dbId = (req as ICustomRequest).dbId;

		if(about_me && !about_me.length){
			return res.status(400).json(ApiError(`about text can't be empty!`));
		}
		
		const topG = await updateUserAboutMe(dbId,about_me);
		return res.status(200).json(ApiSuccess(topG));
		
	} catch (error) {
		return res.status(500).json(ApiError(error));
	}
}