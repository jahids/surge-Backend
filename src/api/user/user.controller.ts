/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import {  findTopInvestors, updateFollowing ,addInvesment} from "../../models/user.model";
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