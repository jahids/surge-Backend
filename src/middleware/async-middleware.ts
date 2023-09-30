/* eslint-disable prettier/prettier */
import { Request, Response, NextFunction, RequestHandler } from "express";

import { errorResponse } from "./error-middleware";
import { ApiError } from "../utils/ApiError";


// @desc Handles async by resolving, and providing error handling to every request

export const asyncHandler = (
  // Takes in function w/ req, res and next and returns either void
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void> | void,
): RequestHandler => {
  // Returns a callback for that can be passed for middleware
  // Passes the callback function inside the returned function, and resolves callback
  return (req: Request, res: Response, next: NextFunction) => {
    // If rejected, return error response
    Promise
      .resolve(fn(req, res, next))
      .catch((error: any) => {
      errorResponse(error, req, res, next);
    });
  };
};
