export interface BaseResponseNotReturn {
    id?: string;
    code: number;
    message: string;
}

export interface BaseResponse<T> extends BaseResponseNotReturn {
    data?: T;
}