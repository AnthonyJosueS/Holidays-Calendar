import prisma from "@lib/prisma.js";
import { holidayTypeQuery } from "@interfaces/holidayType/holidayTypeQuery.js";
import { ResponseBuilder } from "@shared/helpers/baseResponse/ResponseBuilder.js";

export const GetAllHolydaysTypes = async (filters: holidayTypeQuery = {}) => {
    const conditions: any = {};

    if (filters.idHolidayType) conditions.idHolidayType = filters.idHolidayType;
    if (filters.name) conditions.name = { contains: filters.name, mode: 'insensitive' };
    if (filters.status) conditions.status = filters.status;

    const request = await prisma.holidayType.findMany({
        where: conditions,
        orderBy: { name: 'asc' },
    });

    return ResponseBuilder.success(request);
}