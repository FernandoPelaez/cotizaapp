"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { chatShellVariants } from "./animations/ayuda.motion";
import ChatHeader from "./components/ChatHeader";
import ChatInput from "./components/ChatInput";
import EmptyChatState from "./components/EmptyChatState";
import MessageBubble from "./components/MessageBubble";
import SuggestionsList from "./components/SuggestionsList";
import TypingIndicator from "./components/TypingIndicator";
import { ayudaSuggestions } from "./data/ayuda.data";
import styles from "./Ayuda.module.css";

export type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatAyuda() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chat, loading]);

  const sendMessage = async (text?: string) => {
    const trimmed = (text ?? message).trim();
    if (!trimmed || loading) return;

    setChat((prev) => [...prev, { role: "user", content: trimmed }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await res.json();

      const reply = res.ok
        ? data.reply || "Sin respuesta."
        : "El asistente no está disponible en este momento.";

      setChat((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Error de conexión. Intenta de nuevo." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showFollowUpSuggestions =
    chat.length > 0 && chat[chat.length - 1].role === "assistant" && !loading;

  return (
    <motion.div
      className={styles.chatShell}
      variants={chatShellVariants}
      initial="hidden"
      animate="show"
    >
      <ChatHeader />

      <div className={styles.chatBody}>
        <AnimatePresence mode="popLayout">
          {chat.length === 0 && (
            <EmptyChatState
              key="empty-chat-state"
              suggestions={ayudaSuggestions}
              loading={loading}
              onSelectSuggestion={sendMessage}
            />
          )}

          {chat.map((msg, index) => (
            <MessageBubble
              key={`${msg.role}-${index}-${msg.content}`}
              message={msg}
            />
          ))}

          {showFollowUpSuggestions && (
            <SuggestionsList
              key="follow-up-suggestions"
              suggestions={ayudaSuggestions.slice(0, 4)}
              onSelectSuggestion={sendMessage}
              compact
            />
          )}

          {loading && <TypingIndicator key="typing-indicator" />}
        </AnimatePresence>

        <div ref={bottomRef} />
      </div>

      <ChatInput
        message={message}
        loading={loading}
        onChangeMessage={setMessage}
        onSendMessage={() => sendMessage()}
      />
    </motion.div>
  );
}
