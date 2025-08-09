import { codeStatus } from "@shared/constants/codeStatus";
import { sendResponse } from "@shared/helpers/baseResponse/ResponseBuilder";
import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

export const validateRequest = (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if(!result.success) {
        const errorMessages = result.error.issues.map(err => err.message);
        console.log(result);
        return sendResponse(res, codeStatus.BAD_REQUEST, errorMessages, "Error de validacion");
    };
    req.body = result.data;
    next();
};