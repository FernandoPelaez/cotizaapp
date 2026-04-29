import type { Dispatch, SetStateAction } from "react";

export type ToastType = "success" | "error" | "warning";

export type ConfigToastState = {
  msg: string;
  type: ToastType;
} | null;

export interface Usage {
  quotesUsed: number;
  maxQuotes: number;
  remaining: number;
}

export interface Plan {
  name: string;
}

export interface UserMeta {
  updatedAt: string;
  activeSessions: number;
}

export interface MeResponse {
  user: UserMeta;
  plan: Plan | null;
  usage: Usage;
  activeSessions: number;
}

export interface ConfigToastProps {
  msg: string;
  type: ToastType;
}

export interface DeleteAccountModalProps {
  deleteConfirmText: string;
  setDeleteConfirmText: Dispatch<SetStateAction<string>>;
  deleteLoading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface AccountSecurityCardProps {
  email?: string | null;
  userMeta: UserMeta | null;
  activeSessions: number | null;
  isGoogleUser: boolean;
  isEditingEmail: boolean;
  newEmail: string;
  loading: boolean;
  setIsEditingEmail: Dispatch<SetStateAction<boolean>>;
  setNewEmail: Dispatch<SetStateAction<string>>;
  onUpdateEmail: () => void;
  onChangePassword: () => void;
  onLogoutAll: () => void;
  onOpenDeleteModal: () => void;
  formatRelativeTime: (dateStr: string) => string;
}

export interface PlanUsageCardProps {
  plan: Plan | null;
  usage: Usage | null;
  usedPct: number;
  onUpgradeClick: () => void;
}
