import { motion } from "framer-motion";

import { messageVariants } from "../animations/ayuda.motion";
import styles from "../Ayuda.module.css";
import BotIcon from "./BotIcon";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      className={`${styles.messageRow} ${
        isUser ? styles.messageRowUser : styles.messageRowAssistant
      }`}
      variants={messageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      layout
    >
      {!isUser && (
        <div className={styles.messageAvatar}>
          <BotIcon size={14} />
        </div>
      )}

      <div
        className={`${styles.messageBubble} ${
          isUser ? styles.userBubble : styles.assistantBubble
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}
