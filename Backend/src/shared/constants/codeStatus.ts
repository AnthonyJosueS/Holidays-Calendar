export enum codeStatus {
    SUCCESS = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    VALIDATION = 409,
    INTERNAL_SERVER_ERROR = 500,
}

const codeStatusMessages: Record<codeStatus, string> = {
    [codeStatus.SUCCESS]: 'Operación exitosa',
    [codeStatus.CREATED]: 'Recurso creado exitosamente',
    [codeStatus.BAD_REQUEST]: 'Ocurrio un error en la solicitud',
    [codeStatus.UNAUTHORIZED]: 'No autorizado',
    [codeStatus.FORBIDDEN]: 'Acceso prohibido',
    [codeStatus.NOT_FOUND]: 'Recurso no encontrado',
    [codeStatus.VALIDATION]: 'Error de validación',
    [codeStatus.INTERNAL_SERVER_ERROR]: 'Error interno del servidor'
};


export function getCodeStatusMessage(code: codeStatus): string {
    return codeStatusMessages[code] || 'Código desconocido';
}


