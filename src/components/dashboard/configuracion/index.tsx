"use client";

import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { getErrorMessage } from "@/lib/errors";
import { fetchWithAuth } from "@/lib/fetcher";
import {
  formatRelativeTime,
  getEmailValidationMessage,
  getUsedPercentage,
  normalizeEmail,
} from "@/lib/dashboard/configuracion";
import type {
  ConfigToastState,
  MeResponse,
  Plan,
  ToastType,
  Usage,
  UserMeta,
} from "@/types/configuracion";

import {
  cardItemVariants,
  cardsContainerVariants,
  modalOverlayVariants,
  pageContainerVariants,
} from "./animations/configuracion.motion";
import AccountSecurityCard from "./components/AccountSecurityCard";
import ConfigToast from "./components/ConfigToast";
import DeleteAccountModal from "./components/DeleteAccountModal";
import PlanUsageCard from "./components/PlanUsageCard";
import styles from "./Configuracion.module.css";

export default function Configuracion() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  const isHandlingSession = useRef(false);

  const [toast, setToast] = useState<ConfigToastState>(null);
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

  const showToast = (msg: string, type: ToastType = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleInvalidSession = async () => {
    if (isHandlingSession.current) return;

    isHandlingSession.current = true;
    setPageLoading(false);

    await signOut({ redirect: false });
    router.replace("/auth/signin");
  };

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

  const changePassword = () => {
    router.push("/auth/forgot-password");
  };

  const logoutAll = async () => {
    try {
      await signOut({ callbackUrl: "/auth/signin" });
    } catch {
      showToast("Error al cerrar sesiones", "error");
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteConfirmText("");
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
      closeDeleteModal();
    }
  };

  const handleUpdateEmail = async () => {
    if (loading) return;

    const validationMessage = getEmailValidationMessage(
      newEmail,
      session?.user?.email
    );

    if (validationMessage) {
      showToast(validationMessage, "warning");
      return;
    }

    const email = normalizeEmail(newEmail);

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

  const usedPct = getUsedPercentage(usage);
  const isGoogleUser = !!session?.user?.image?.includes("googleusercontent");

  if (pageLoading) {
    if (toast) {
      return <ConfigToast msg={toast.msg} type={toast.type} />;
    }

    return null;
  }

  return (
    <>
      {toast && <ConfigToast msg={toast.msg} type={toast.type} />}

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            key="delete-account-modal"
            variants={modalOverlayVariants}
            initial="hidden"
            animate="show"
            exit="exit"
          >
            <DeleteAccountModal
              deleteConfirmText={deleteConfirmText}
              setDeleteConfirmText={setDeleteConfirmText}
              deleteLoading={deleteLoading}
              onClose={closeDeleteModal}
              onConfirm={deleteAccount}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={pageContainerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className={styles.wrap}
          variants={cardsContainerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={cardItemVariants}>
            <AccountSecurityCard
              email={session?.user?.email}
              userMeta={userMeta}
              activeSessions={activeSessions}
              isGoogleUser={isGoogleUser}
              isEditingEmail={isEditingEmail}
              newEmail={newEmail}
              loading={loading}
              setIsEditingEmail={setIsEditingEmail}
              setNewEmail={setNewEmail}
              onUpdateEmail={handleUpdateEmail}
              onChangePassword={changePassword}
              onLogoutAll={logoutAll}
              onOpenDeleteModal={() => setShowDeleteModal(true)}
              formatRelativeTime={formatRelativeTime}
            />
          </motion.div>

          <motion.div variants={cardItemVariants}>
            <PlanUsageCard
              plan={plan}
              usage={usage}
              usedPct={usedPct}
              onUpgradeClick={() => router.push("/planes")}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}
