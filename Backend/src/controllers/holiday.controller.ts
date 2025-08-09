import { Request, Response } from "express";
import { GetAllHolidays, CreateHoliday, UpdateHoliday, InactivateHoliday, ActivateHoliday } from "@services/holiday.service";
import serializeBigIntToNumber from "@shared/helpers/serializeBigIntToNumber";
import { sendResponse } from "@shared/helpers/baseResponse/ResponseBuilder";

export const GetHolidays = async (req: Request, res: Response) => {
    const holidays = await GetAllHolidays(req.query);
    const serialized = serializeBigIntToNumber(holidays);
    return sendResponse(res, serialized.code, serialized.data, serialized.message);
}

export const PostHoliday = async (req: Request, res: Response) => {
    const newHoliday = await CreateHoliday(req.body);
    const serialized = serializeBigIntToNumber(newHoliday);
    return sendResponse(res, serialized.code, serialized.data, serialized.message);
}

export const PutHoliday = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedHoliday = await UpdateHoliday(id, req.body);
    const serialized = serializeBigIntToNumber(updatedHoliday);
    return sendResponse(res, serialized.code, serialized.data, serialized.message);
}

export const DisableHoliday = async (req: Request, res: Response) => {
    console.log(req.params.id);
    const id = parseInt(req.params.id);
    const deletedHoliday = await InactivateHoliday(id);
    const serialized = serializeBigIntToNumber(deletedHoliday);
    return sendResponse(res, serialized.code, serialized.data, serialized.message);
}

export const EnableHoliday = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const deletedHoliday = await ActivateHoliday(id);
    const serialized = serializeBigIntToNumber(deletedHoliday);
    return sendResponse(res, serialized.code, serialized.data, serialized.message);
}


