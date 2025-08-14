export interface HolidayType {
  idHolidayType: number;
  name: string;
  status: string;
  createdAt: string;
  modifiedAt?: string | null;
  deletedAt?: string | null;
}

export interface Holiday {
  idHoliday: number;
  name: string;
  date: string;           // ISO
  isRecovery: boolean;
  status: string;
  createdAt: string;
  modifiedAt?: string | null;
  deletedAt?: string | null;
  holidayTypeId: number;
  holidayType?: HolidayType;
}

export interface HolidayQuery {
  idHoliday?: number;
  year?: number;
  month?: number;          // 1-12
  holidayTypeId?: number;
  isRecovery?: boolean;
  status?: string;
}

export interface HolidayRequest {
  name: string;
  date: string | Date;     // enviamos ISO al backend
  isRecovery: boolean;
  holidayTypeId: number;
}