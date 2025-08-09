import { Request, Response } from "express";
import { GetAllHolydaysTypes } from "@services/holidayType.service";
import serializeBigIntToNumber from "@shared/helpers/serializeBigIntToNumber";
import { sendResponse } from "@shared/helpers/baseResponse/ResponseBuilder";

export const GetHolidaysTypes = async (req: Request, res: Response) => {
    const holidayTypes = await GetAllHolydaysTypes(req.query);
    const serializedHolidayTypes = serializeBigIntToNumber(holidayTypes);
    sendResponse(res, serializedHolidayTypes.code, serializedHolidayTypes.data);
}