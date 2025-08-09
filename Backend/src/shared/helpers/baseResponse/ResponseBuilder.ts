import { codeStatus, getCodeStatusMessage } from "@shared/constants/codeStatus";
import { BaseResponse } from "./BaseResponseInterface";
import { Response } from "express";

export class ResponseBuilder {
    static success<T>(data?: T, message?: string): BaseResponse<T> {
        return {
            code: codeStatus.SUCCESS,
            message: message || getCodeStatusMessage(codeStatus.SUCCESS),
            data
        };
    }

    static created<T>(data?: T, message?: string): BaseResponse<T> {
        return {
            code: codeStatus.CREATED,
            message: message || getCodeStatusMessage(codeStatus.CREATED),
            data
        };
    }

    static notFound<T>(message?: string, data?: T): BaseResponse<T> {
        return {
            code: codeStatus.NOT_FOUND,
            message: message || getCodeStatusMessage(codeStatus.NOT_FOUND),
            data
        };
    }

    static badRequest<T>(message?: string, data?: T): BaseResponse<T> {
        return {
            code: codeStatus.BAD_REQUEST,
            message: message || getCodeStatusMessage(codeStatus.BAD_REQUEST),
            data
        };
    }

    static validation<T>(message?: string, data?: T): BaseResponse<T> {
        return {
            code: codeStatus.VALIDATION,
            message: message || getCodeStatusMessage(codeStatus.VALIDATION),
            data
        };
    }

    static error<T>(message?: string, data?: T): BaseResponse<T> {
        return {
            code: codeStatus.INTERNAL_SERVER_ERROR,
            message: message || getCodeStatusMessage(codeStatus.INTERNAL_SERVER_ERROR),
            data
        };
    }

    static custom<T>(code: codeStatus, message?: string, data?: T): BaseResponse<T> {
        return {
            code,
            message: message || getCodeStatusMessage(code),
            data
        };
    }
}

export function sendResponse(res: Response, status: codeStatus, data?: any, message?: string) {
  return res.status(status).json({
    message: message || getCodeStatusMessage(status),
    data
  });
}