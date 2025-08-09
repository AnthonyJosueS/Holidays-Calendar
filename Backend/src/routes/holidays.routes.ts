import { Router } from "express";
import { GetHolidays, PostHoliday, PutHoliday, DisableHoliday, EnableHoliday } from "@controllers/holiday.controller";
import { validateRequest } from "middlewares/validateRequest";
import { HolidaySchema } from "@schemas/holiday/holiday.schema";

const router = Router();

router.get('/', GetHolidays);
router.post('/',validateRequest(HolidaySchema), PostHoliday);
router.put('/:id',validateRequest(HolidaySchema), PutHoliday);
router.delete('/:id', DisableHoliday);
router.patch('/:id', EnableHoliday);

export default router;