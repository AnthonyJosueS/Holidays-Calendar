import prisma from "@lib/prisma.js";
import { HolidayQuery } from "@interfaces/holiday/holidayQuery.js";
import { HolidayRequest } from "@interfaces/holiday/holidayRequest.js";
import { Status } from "@shared/constants/status.js";
import { ResponseBuilder } from "@shared/helpers/baseResponse/ResponseBuilder";

export const GetAllHolidays = async (filters: HolidayQuery ={}) => {
    const conditions: any = {};
    const year = filters.year ? Number(filters.year) : undefined;
    const month = filters.month ? Number(filters.month) - 1 : undefined;

    if (year && month !== undefined) {
        const start = new Date(year, month, 1);
        const end = new Date(year, month + 1, 0, 23, 59, 59, 999);
        conditions.date = { gte: start, lte: end };
    } 
    else if (year) {
        const start = new Date(year, 0, 1);
        const end = new Date(year, 11, 31, 23, 59, 59, 999);
        conditions.date = { gte: start, lte: end };
    }

    if (filters.holidayTypeId) conditions.holidayTypeId = filters.holidayTypeId;

    if (filters.status) conditions.status = filters.status;

    const request = await prisma.holiday.findMany({
        where: conditions,
        include: { holidayType: true,},
        orderBy: { date: 'asc' },
    });

    return ResponseBuilder.success(request);
}

export const CreateHoliday = async (holidayData: HolidayRequest) => {
    const { name, date, isRecovery, holidayTypeId } = holidayData;

    const conditions: any = { name: name.toUpperCase(), status: Status.ACTIVE };
    const existingHoliday = await prisma.holiday.findFirst({ where: conditions });
    if(existingHoliday) return ResponseBuilder.badRequest("Ya existe un feriado con ese nombre");

    const newHoliday = await prisma.holiday.create({
        data: {
            name,
            date,
            isRecovery,
            holidayTypeId,
            status: Status.ACTIVE,
            createdAt: new Date(),
          }
    });

    return ResponseBuilder.created(newHoliday);
}

export const UpdateHoliday = async (idHoliday: number, holidayData: HolidayRequest) => {
  const { name, date, isRecovery, holidayTypeId } = holidayData;
  const holiday = await prisma.holiday.findUnique({ where: { idHoliday } });

  if(!holiday) return ResponseBuilder.notFound("Feriado no encontrado");
  if(holiday.status === Status.INACTIVE) return ResponseBuilder.badRequest("No se puede modificar un feriado inactivo");

  if(holidayData.name) {
    const conditions: any = { name: name.toUpperCase(), status: Status.ACTIVE };
    const existingHoliday = await prisma.holiday.findFirst({ where: conditions });
    if(existingHoliday && existingHoliday.idHoliday !== holiday.idHoliday) return ResponseBuilder.badRequest("Ya existe un feriado con ese nombre");
  }

  const updatedHoliday = await prisma.holiday.update({
    where: { idHoliday },
    data: {
      name,
      date,
      isRecovery,
      holidayTypeId,
      status: Status.ACTIVE,
      modifiedAt: new Date(),
    },
  });

  return ResponseBuilder.success(updatedHoliday, "Feriado actualizado correctamente");
}

export const InactivateHoliday = async (idHoliday: number) => {
  const holiday = await prisma.holiday.findUnique({ where: { idHoliday } });

  if(!holiday) return ResponseBuilder.notFound("Feriado no encontrado");
  if(holiday.status === Status.INACTIVE) return ResponseBuilder.badRequest("Feriado ya se encuentra inactivo");

  const deletedHoliday = await prisma.holiday.update({
    where: { idHoliday },
    data: {
      status: Status.INACTIVE,
      deletedAt: new Date(),
    },
  });

  return ResponseBuilder.success(deletedHoliday, "Feriado eliminado correctamente");
}

export const ActivateHoliday = async (idHoliday: number) => {
  const holiday = await prisma.holiday.findUnique({ where: { idHoliday } });

  if(!holiday) return ResponseBuilder.notFound("Feriado no encontrado");
  if(holiday.status === Status.ACTIVE) return ResponseBuilder.badRequest("Feriado ya se encuentra activo");

  const activatedHoliday = await prisma.holiday.update({
    where: { idHoliday },
    data: {
      status: Status.ACTIVE,
      modifiedAt: new Date(),
    },
  });

  return ResponseBuilder.success(activatedHoliday, "Feriado activado correctamente");
}