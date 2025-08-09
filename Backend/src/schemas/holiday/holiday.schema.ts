import { ISO8601_DATE_REGEX } from "@shared/helpers/regex";
import { z } from "zod";


export const HolidaySchema = z.object({
    name: z.string("El nombre es obligatorio")
            .min(1, "El nombre debe contener al menos un caracter")
            .max(64, "El nombre no puede exceder los 64 caracteres")
            .transform((nam: string) => nam.trim().toUpperCase())
            .refine((name) => name.length > 0, "El nombre no puede estar vacío"),
    date: z.string("La Fecha es obligatoria")
            .regex(ISO8601_DATE_REGEX, "La fecha debe estar en formato ISO 8601")
            .transform((val) => { 
                const date = new Date(val) 
                if(!isNaN(date.getTime())) return date;
                else throw new Error("La fecha no es válida");
            }),
    isRecovery: z.boolean()
                 .default(false),
    holidayTypeId: z.number("El tipo de Feriado es obligatorio")
                    .int()
                    .positive("Debe ser un número positivo"),
})