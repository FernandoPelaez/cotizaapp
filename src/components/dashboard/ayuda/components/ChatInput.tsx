"use client";

import { motion } from "framer-motion";

import { ayudaEase } from "../animations/ayuda.motion";
import styles from "../Ayuda.module.css";

type ChatInputProps = {
  message: string;
  loading: boolean;
  onChangeMessage: (value: string) => void;
  onSendMessage: () => void;
};

export default function ChatInput({
  message,
  loading,
  onChangeMessage,
  onSendMessage,
}: ChatInputProps) {
  const isDisabled = loading || !message.trim();

  return (
    <motion.div
      className={styles.chatInputBar}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: ayudaEase }}
    >
      <input
        className={styles.chatInput}
        value={message}
        onChange={(e) => onChangeMessage(e.target.value)}
        placeholder="Escribe tu pregunta..."
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSendMessage();
          }
        }}
      />
      <button
        type="button"
        className={styles.sendButton}
        onClick={onSendMessage}
        disabled={isDisabled}
      >
        {loading ? "..." : "Enviar"}
      </button>
    </motion.div>
  );
}
