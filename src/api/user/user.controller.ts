/* eslint-disable prettier/prettier */
import { Router, Request, Response } from "express";
import { ApiError } from "../../utils/ApiError";
import { ICustomRequest } from "../../types/interfaces/ICustomRequest";
import {  updateFollowing } from "../../models/user.model";
import { ApiSuccess } from "../../utils/ApiSuccess";

export const getUserById = async (req: Request, res: Response) => {
	res.send("test");
};

export const getSelf = async (req : Request, res  : Response)=>{
	
};