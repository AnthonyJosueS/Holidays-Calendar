export interface HolidayRequest {
    name: string,
    date: Date,
    isRecovery: boolean;
    holidayTypeId: number;
}