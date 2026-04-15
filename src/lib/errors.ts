export const ERROR_MESSAGES: Record<string, string> = {

  UNAUTHORIZED: "No autorizado",
  USER_NOT_FOUND: "Usuario no encontrado",

  EMAIL_REQUIRED: "El correo es requerido",
  INVALID_EMAIL_FORMAT: "Formato de correo inválido",
  EMAIL_ALREADY_EXISTS: "Este correo ya está en uso",
  EMAIL_SAME_AS_CURRENT: "Ese ya es tu correo actual",

  INVALID_BODY: "Datos inválidos",

  INTERNAL_SERVER_ERROR: "Error interno del servidor",
};

export function getErrorMessage(code: string): string {
  return ERROR_MESSAGES[code] || "Ocurrió un error inesperado";
}


