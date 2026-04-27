"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/lib/errors";
import { fetchWithAuth } from "@/lib/fetcher";

interface Usage {
  quotesUsed: number;
  maxQuotes: number;
  remaining: number;
}

interface Plan {
  name: string;
}

interface UserMeta {
  updatedAt: string;
  activeSessions: number;
}

interface MeResponse {
  user: UserMeta;
  plan: Plan | null;
  usage: Usage;
  activeSessions: number;
}

export default function Configuracion() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isHandlingSession = useRef(false);

  const handleInvalidSession = async () => {
    if (isHandlingSession.current) return;
    isHandlingSession.current = true;
    setPageLoading(false);
    await signOut({ redirect: false });
    router.replace("/auth/signin");
  };

  const [toast, setToast] = useState<{
    msg: string;
    type: "success" | "error" | "warning";
  } | null>(null);
  const [usage, setUsage] = useState<Usage | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [userMeta, setUserMeta] = useState<UserMeta | null>(null);
  const [activeSessions, setActiveSessions] = useState<number | null>(null);

  const refreshUserData = async () => {
    try {
      const data = await fetchWithAuth<MeResponse>(
        "/api/user/me",
        {},
        handleInvalidSession
      );

      if (!data) return;

      setUserMeta(data.user);
      setPlan(data.plan);
      setUsage(data.usage);
      setActiveSessions(data.activeSessions);
    } catch (err: any) {
      if (err?.error === "USER_NOT_FOUND") {
        await signOut({ redirect: false });
        router.replace("/auth/register");
        showToast("Tu cuenta fue eliminada. Regístrate nuevamente.", "error");
        return;
      }

      showToast(getErrorMessage(err?.error), "error");
    }
  };

  useEffect(() => {
    if (status !== "authenticated") {
      if (status !== "loading") setPageLoading(false);
      return;
    }

    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await fetchWithAuth<MeResponse>(
          "/api/user/me",
          {},
          handleInvalidSession
        );

        if (!data) return;

        if (!isMounted) return;

        setUserMeta(data.user);
        setPlan(data.plan);
        setUsage(data.usage);
        setActiveSessions(data.activeSessions);
      } catch (err: any) {
        if (!isMounted) return;

        if (err?.error === "USER_NOT_FOUND") {
          await signOut({ redirect: false });
          router.replace("/auth/register");
          showToast("Tu cuenta fue eliminada. Regístrate nuevamente.", "error");
          return;
        }

        showToast(getErrorMessage(err?.error), "error");
      } finally {
        if (isMounted) setPageLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [status]);

  const formatRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Sin datos";
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
  };

  const showToast = (
    msg: string,
    type: "success" | "error" | "warning" = "success"
  ) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const changePassword = () => router.push("/auth/forgot-password");

  const logoutAll = async () => {
    try {
      await signOut({ callbackUrl: "/auth/signin" });
    } catch {
      showToast("Error al cerrar sesiones", "error");
    }
  };

  const deleteAccount = async () => {
    if (deleteConfirmText !== "ELIMINAR") {
      showToast('Debes escribir "ELIMINAR" para confirmar', "warning");
      return;
    }

    setDeleteLoading(true);
    try {
      const res = await fetch("/api/user/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ confirmText: deleteConfirmText }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(getErrorMessage(data.error), "error");
        return;
      }

      showToast("Cuenta eliminada correctamente");
      await signOut({ callbackUrl: "/auth/signin" });
    } catch {
      showToast("Error de conexión al eliminar", "error");
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
      setDeleteConfirmText("");
    }
  };

  const handleUpdateEmail = async () => {
    if (loading) return;

    const email = newEmail.trim().toLowerCase();

    if (!email) {
      showToast("El correo es requerido", "warning");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      showToast("Formato de correo inválido", "warning");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("Correo inválido, verifica el formato", "warning");
      return;
    }

    if (email === session?.user?.email?.toLowerCase()) {
      showToast("Ese ya es tu correo actual", "warning");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/update-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newEmail: email }),
      });
      const data = await res.json();

      if (!res.ok) {
        showToast(getErrorMessage(data.error), "error");
        return;
      }

      await update({ email });
      await refreshUserData();
      showToast("Correo actualizado correctamente");
      setIsEditingEmail(false);
      setNewEmail("");
    } catch {
      showToast("Error de conexión al actualizar correo", "error");
    } finally {
      setLoading(false);
    }
  };

  const usedPct =
    usage && usage.maxQuotes > 0
      ? Math.min((usage.quotesUsed / usage.maxQuotes) * 100, 100)
      : 0;

  const isGoogleUser = !!session?.user?.image?.includes("googleusercontent");

  const toastColors: Record<
    "success" | "error" | "warning",
    { bg: string; shadow: string }
  > = {
    success: {
      bg: "var(--success)",
      shadow: "color-mix(in srgb, var(--success) 35%, transparent)",
    },
    error: {
      bg: "var(--error)",
      shadow: "color-mix(in srgb, var(--error) 35%, transparent)",
    },
    warning: {
      bg: "var(--warning)",
      shadow: "color-mix(in srgb, var(--warning) 35%, transparent)",
    },
  };

  return (
    <>
      <style>{`
        .sk {
          background: color-mix(in srgb, var(--foreground) 8%, var(--card));
          border-radius: 8px;
        }

        .cfg-wrap {
          font-family: 'Segoe UI', system-ui, sans-serif;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          align-items: start;
          max-width: 860px;
        }

        @media (max-width: 860px) {
          .cfg-wrap {
            grid-template-columns: 1fr;
            max-width: 480px;
          }
        }

        .cfg-card {
          background: var(--card);
          border: 1.5px solid color-mix(in srgb, var(--border) 75%, transparent);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 2px 12px color-mix(in srgb, var(--foreground) 6%, transparent);
          display: flex;
          flex-direction: column;
        }

        .cfg-head {
          padding: 15px 22px;
          display: flex;
          align-items: center;
          gap: 10px;
          background: var(--primary);
        }

        .cfg-head-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          background: color-mix(in srgb, var(--card) 18%, transparent);
          color: var(--card);
        }

        .cfg-head-title {
          font-size: 11px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--card);
          margin: 0;
        }

        .cfg-body {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .cfg-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 22px;
          border-bottom: 1px solid color-mix(in srgb, var(--border) 48%, transparent);
          gap: 1rem;
        }

        .cfg-row:last-child {
          border-bottom: none;
        }

        .cfg-row:hover {
          background: color-mix(in srgb, var(--background) 45%, var(--card));
        }

        .cfg-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--foreground);
          margin: 0 0 2px;
          line-height: 1;
        }

        .cfg-hint {
          font-size: 11.5px;
          color: var(--text-muted);
          margin: 0;
          line-height: 1.4;
        }

        .cfg-btn {
          height: 33px;
          padding: 0 14px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: inherit;
          border: none;
          outline: none;
        }

        .cfg-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-outline {
          background: var(--card);
          border: 1.5px solid color-mix(in srgb, var(--border) 85%, transparent);
          color: var(--foreground);
        }

        .btn-outline:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-soft);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 8%, transparent);
        }

        .btn-primary {
          background: var(--primary);
          color: var(--card);
          box-shadow: 0 2px 6px color-mix(in srgb, var(--primary) 25%, transparent);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          box-shadow: 0 4px 12px color-mix(in srgb, var(--primary) 30%, transparent);
        }

        .btn-green {
          background: var(--success);
          color: var(--card);
          box-shadow: 0 2px 6px color-mix(in srgb, var(--success) 25%, transparent);
        }

        .btn-green:hover {
          box-shadow: 0 4px 12px color-mix(in srgb, var(--success) 30%, transparent);
        }

        .btn-danger-soft {
          background: var(--error-bg);
          border: 1.5px solid color-mix(in srgb, var(--error) 35%, var(--border));
          color: var(--error);
        }

        .btn-danger-soft:hover {
          background: color-mix(in srgb, var(--error) 16%, var(--card));
        }

        .cfg-input {
          width: 100%;
          height: 38px;
          padding: 0 12px;
          border: 1.5px solid color-mix(in srgb, var(--border) 85%, transparent);
          border-radius: 9px;
          font-size: 13px;
          color: var(--foreground);
          outline: none;
          background: var(--card);
          font-family: inherit;
          box-sizing: border-box;
        }

        .cfg-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--primary) 10%, transparent);
        }

        .cfg-input.danger {
          border-color: color-mix(in srgb, var(--error) 35%, var(--border));
        }

        .cfg-input.danger:focus {
          border-color: var(--error);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--error) 10%, transparent);
        }

        .email-panel {
          background: color-mix(in srgb, var(--background) 55%, var(--card));
          border: 1.5px solid color-mix(in srgb, var(--border) 75%, transparent);
          border-radius: 12px;
          padding: 14px 16px;
          margin-top: 12px;
        }

        .email-panel-label {
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.09em;
          color: var(--text-muted);
          margin: 0 0 8px;
        }

        .email-panel-actions {
          display: flex;
          gap: 8px;
          margin-top: 10px;
        }

        .danger-zone {
          margin: 0 22px;
          border-top: 1px dashed color-mix(in srgb, var(--error) 35%, var(--border));
        }

        .danger-row {
          background: color-mix(in srgb, var(--error) 5%, var(--card));
          padding: 16px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .danger-row:hover {
          background: color-mix(in srgb, var(--error) 8%, var(--card));
        }

        .progress-track {
          height: 6px;
          background: color-mix(in srgb, var(--border) 42%, transparent);
          border-radius: 99px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: 99px;
        }

        .badge {
          font-size: 11px;
          font-weight: 600;
          padding: 3px 10px;
          border-radius: 20px;
          white-space: nowrap;
        }

        .pro-feature {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 7px 0;
        }

        .pro-feature-check {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--success-bg);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--success);
        }

        .pro-feature-text {
          font-size: 13px;
          color: var(--foreground);
          font-weight: 500;
        }

        .cfg-footer {
          padding: 16px 22px;
          border-top: 1px solid color-mix(in srgb, var(--border) 48%, transparent);
        }

        .confirm-box {
          background: color-mix(in srgb, var(--error) 6%, var(--card));
          border: 1.5px solid color-mix(in srgb, var(--error) 35%, var(--border));
          border-radius: 10px;
          padding: 12px 14px;
          margin-top: 14px;
        }

        .confirm-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--error);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0 0 8px;
        }
      `}</style>

      {toast && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            background: toastColors[toast.type].bg,
            color: "var(--card)",
            padding: "13px 22px",
            borderRadius: 14,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: `0 8px 32px ${toastColors[toast.type].shadow}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "color-mix(in srgb, var(--card) 20%, transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {toast.type === "success" && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
            {toast.type === "error" && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            {toast.type === "warning" && (
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            )}
          </span>
          {toast.msg}
        </div>
      )}

      {showDeleteModal && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
              setDeleteConfirmText("");
            }
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "color-mix(in srgb, var(--foreground) 65%, transparent)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--card)",
              borderRadius: 22,
              padding: "2.25rem",
              width: "90%",
              maxWidth: 420,
              boxShadow:
                "0 32px 80px color-mix(in srgb, var(--foreground) 25%, transparent)",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "var(--error-bg)",
                border: "1.5px solid color-mix(in srgb, var(--error) 35%, var(--border))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1.25rem",
                color: "var(--error)",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
              </svg>
            </div>

            <h3
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "var(--foreground)",
                margin: "0 0 0.45rem",
                letterSpacing: "-0.02em",
              }}
            >
              ¿Eliminar tu cuenta?
            </h3>

            <p
              style={{
                fontSize: 13.5,
                color: "var(--text-muted)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              Esta acción es{" "}
              <strong style={{ color: "var(--error)" }}>
                permanente e irreversible
              </strong>
              . Se eliminarán todos tus datos, cotizaciones y configuraciones.
            </p>

            <div className="confirm-box">
              <p className="confirm-label">Escribe ELIMINAR para confirmar</p>
              <input
                className="cfg-input danger"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="ELIMINAR"
                autoFocus
              />
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                }}
                className="cfg-btn btn-outline"
                style={{
                  flex: 1,
                  justifyContent: "center",
                  height: 42,
                  borderRadius: 11,
                  fontSize: 13,
                }}
              >
                Cancelar
              </button>

              <button
                onClick={deleteAccount}
                disabled={deleteLoading || deleteConfirmText !== "ELIMINAR"}
                style={{
                  flex: 1,
                  height: 42,
                  borderRadius: 11,
                  border: "none",
                  background:
                    deleteConfirmText === "ELIMINAR"
                      ? "var(--error)"
                      : "color-mix(in srgb, var(--error) 24%, var(--card))",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--card)",
                  cursor:
                    deleteLoading || deleteConfirmText !== "ELIMINAR"
                      ? "not-allowed"
                      : "pointer",
                  opacity: deleteLoading ? 0.7 : 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  fontFamily: "inherit",
                  boxShadow:
                    deleteConfirmText === "ELIMINAR"
                      ? "0 4px 14px color-mix(in srgb, var(--error) 30%, transparent)"
                      : "none",
                }}
              >
                {deleteLoading ? (
                  <>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                      <path d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    </svg>
                    Sí, eliminar cuenta
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {pageLoading ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.25rem",
            maxWidth: 860,
            fontFamily: "'Segoe UI', system-ui, sans-serif",
          }}
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                background: "var(--card)",
                border:
                  "1.5px solid color-mix(in srgb, var(--border) 75%, transparent)",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow:
                  "0 2px 12px color-mix(in srgb, var(--foreground) 5%, transparent)",
              }}
            >
              <div
                style={{
                  padding: "15px 22px",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 9,
                    background:
                      "color-mix(in srgb, var(--card) 20%, transparent)",
                  }}
                />
                <div
                  style={{
                    width: 120,
                    height: 12,
                    borderRadius: 6,
                    background:
                      "color-mix(in srgb, var(--card) 20%, transparent)",
                  }}
                />
              </div>

              {[1, 2, 3].map((j) => (
                <div
                  key={j}
                  style={{
                    padding: "18px 22px",
                    borderBottom:
                      "1px solid color-mix(in srgb, var(--border) 48%, transparent)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div
                      className="sk"
                      style={{ width: 110 + j * 20, height: 12, marginBottom: 7 }}
                    />
                    <div
                      className="sk"
                      style={{ width: 80 + j * 10, height: 10 }}
                    />
                  </div>
                  <div
                    className="sk"
                    style={{ width: 80, height: 33, borderRadius: 8 }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="cfg-wrap">
          <div className="cfg-card">
            <div className="cfg-head">
              <div className="cfg-head-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <p className="cfg-head-title">Cuenta y seguridad</p>
            </div>

            <div className="cfg-body">
              <div
                className="cfg-row"
                style={{ flexDirection: "column", alignItems: "stretch", gap: 0 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p className="cfg-label">Correo electrónico</p>
                    <p className="cfg-hint">
                      {session?.user?.email || "Sin correo"}
                    </p>
                  </div>

                  {!isEditingEmail && (
                    <button
                      className="cfg-btn btn-outline"
                      onClick={() => {
                        setIsEditingEmail(true);
                        setNewEmail(session?.user?.email || "");
                      }}
                    >
                      Cambiar
                    </button>
                  )}
                </div>

                {isEditingEmail && (
                  <div className="email-panel">
                    <p className="email-panel-label">Nuevo correo electrónico</p>
                    <input
                      className="cfg-input"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="correo@ejemplo.com"
                      type="email"
                      autoFocus
                    />

                    <div className="email-panel-actions">
                      <button
                        className="cfg-btn btn-primary"
                        onClick={handleUpdateEmail}
                        disabled={loading}
                        style={{ flex: 1, justifyContent: "center" }}
                      >
                        {loading ? (
                          <>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                strokeOpacity="0.25"
                              />
                              <path d="M12 2a10 10 0 0 1 10 10" />
                            </svg>
                            Guardando...
                          </>
                        ) : (
                          <>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Guardar cambio
                          </>
                        )}
                      </button>

                      <button
                        className="cfg-btn btn-danger-soft"
                        onClick={() => {
                          setIsEditingEmail(false);
                          setNewEmail("");
                        }}
                        style={{ flex: 1, justifyContent: "center" }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="cfg-row">
                <div>
                  <p className="cfg-label">Contraseña</p>
                  <p className="cfg-hint">
                    {userMeta?.updatedAt
                      ? `Última actualización ${formatRelativeTime(
                          userMeta.updatedAt
                        )}`
                      : "Sin datos"}
                  </p>
                </div>

                <button className="cfg-btn btn-outline" onClick={changePassword}>
                  Cambiar
                </button>
              </div>

              <div className="cfg-row">
                <div>
                  <p className="cfg-label">Sesiones activas</p>
                  <p className="cfg-hint">
                    {isGoogleUser
                      ? "Sesión activa vía Google"
                      : activeSessions !== null
                      ? activeSessions === 1
                        ? "1 dispositivo conectado"
                        : `${activeSessions} dispositivos conectados`
                      : "Sin datos"}
                  </p>
                </div>

                <button className="cfg-btn btn-outline" onClick={logoutAll}>
                  Cerrar sesiones
                </button>
              </div>

              <div style={{ flex: 1 }} />

              <div className="danger-zone" />
              <div className="danger-row">
                <div>
                  <p className="cfg-label" style={{ color: "var(--error)" }}>
                    Eliminar cuenta
                  </p>
                  <p className="cfg-hint">Acción permanente e irreversible</p>
                </div>

                <button
                  className="cfg-btn btn-danger-soft"
                  onClick={() => setShowDeleteModal(true)}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
                    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <div className="cfg-card">
            <div className="cfg-head">
              <div className="cfg-head-icon">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <p className="cfg-head-title">Plan y uso</p>
            </div>

            <div className="cfg-body">
              <div className="cfg-row">
                <div>
                  <p className="cfg-label">Plan actual</p>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 5,
                      fontSize: 10.5,
                      fontWeight: 700,
                      padding: "2px 10px",
                      borderRadius: 20,
                      background:
                        "color-mix(in srgb, var(--foreground) 6%, var(--card))",
                      color: "var(--text-muted)",
                      letterSpacing: "0.07em",
                      border:
                        "1px solid color-mix(in srgb, var(--border) 75%, transparent)",
                    }}
                  >
                    {plan?.name ?? "FREE"}
                  </span>
                </div>
              </div>

              <div
                className="cfg-row"
                style={{ flexDirection: "column", alignItems: "stretch", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <p className="cfg-label">Cotizaciones usadas</p>
                    <p className="cfg-hint">
                      {usage
                        ? `${usage.quotesUsed} de ${usage.maxQuotes} utilizadas`
                        : "Sin datos"}
                    </p>
                  </div>

                  {usage && (
                    <span
                      className="badge"
                      style={{
                        color:
                          usage.quotesUsed >= usage.maxQuotes
                            ? "var(--error)"
                            : "var(--success)",
                        background:
                          usage.quotesUsed >= usage.maxQuotes
                            ? "var(--error-bg)"
                            : "var(--success-bg)",
                        border: `1px solid ${
                          usage.quotesUsed >= usage.maxQuotes
                            ? "color-mix(in srgb, var(--error) 35%, var(--border))"
                            : "color-mix(in srgb, var(--success) 35%, var(--border))"
                        }`,
                      }}
                    >
                      {usage.quotesUsed >= usage.maxQuotes
                        ? "Límite alcanzado"
                        : `${usage.remaining} disponible${
                            usage.remaining !== 1 ? "s" : ""
                          }`}
                    </span>
                  )}
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${usedPct}%`,
                      background:
                        usedPct >= 100
                          ? "var(--error)"
                          : usedPct >= 66
                          ? "var(--warning)"
                          : "var(--success)",
                    }}
                  />
                </div>
              </div>

              <div
                className="cfg-row"
                style={{ flexDirection: "column", alignItems: "stretch", gap: 0 }}
              >
                <p
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "0 0 8px",
                  }}
                >
                  Incluido en Pro
                </p>

                {[
                  "Cotizaciones ilimitadas",
                  "Plantillas premium exclusivas",
                  "PDF con tu marca personalizada",
                  "Soporte prioritario 24/7",
                ].map((text) => (
                  <div key={text} className="pro-feature">
                    <div className="pro-feature-check">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="pro-feature-text">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="cfg-footer">
              <button
                className="cfg-btn btn-green"
                onClick={() => router.push("/planes")}
                style={{
                  width: "100%",
                  justifyContent: "center",
                  height: 40,
                  borderRadius: 10,
                  fontSize: 13,
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Mejorar a Pro — Ver planes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
