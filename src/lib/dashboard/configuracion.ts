import type { Usage } from "@/types/configuracion";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return "Sin datos";

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "hoy";
  if (diffDays === 1) return "hace 1 día";
  if (diffDays < 30) return `hace ${diffDays} días`;

  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths === 1) return "hace 1 mes";
  if (diffMonths < 12) return `hace ${diffMonths} meses`;

  const diffYears = Math.floor(diffMonths / 12);

  return diffYears === 1 ? "hace 1 año" : `hace ${diffYears} años`;
}

export function getUsedPercentage(usage: Usage | null): number {
  if (!usage || usage.maxQuotes <= 0) return 0;

  return Math.min((usage.quotesUsed / usage.maxQuotes) * 100, 100);
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function getEmailValidationMessage(
  email: string,
  currentEmail?: string | null
): string | null {
  const normalizedEmail = normalizeEmail(email);
  const normalizedCurrentEmail = currentEmail
    ? normalizeEmail(currentEmail)
    : null;

  if (!normalizedEmail) {
    return "El correo es requerido";
  }

  if (!normalizedEmail.includes("@") || !normalizedEmail.includes(".")) {
    return "Formato de correo inválido";
  }

  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return "Correo inválido, verifica el formato";
  }

  if (normalizedCurrentEmail && normalizedEmail === normalizedCurrentEmail) {
    return "Ese ya es tu correo actual";
  }

  return null;
}
