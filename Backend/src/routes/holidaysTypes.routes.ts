import { Router } from "express";
import { GetHolidaysTypes } from "@controllers/holidayType.controller";

const router = Router();
router.get('/', GetHolidaysTypes);
export default router;