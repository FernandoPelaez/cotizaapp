import { motion } from "framer-motion";

import { messageVariants, typingDotVariants } from "../animations/ayuda.motion";
import styles from "../Ayuda.module.css";
import BotIcon from "./BotIcon";

const typingDots = [0, 1, 2];

export default function TypingIndicator() {
  return (
    <motion.div
      className={`${styles.messageRow} ${styles.messageRowAssistant}`}
      variants={messageVariants}
      initial="hidden"
      animate="show"
      exit="exit"
      layout
    >
      <div className={styles.messageAvatar}>
        <BotIcon size={14} />
      </div>

      <div className={styles.typingBubble}>
        {typingDots.map((dot) => (
          <motion.span
            key={dot}
            className={styles.typingDot}
            variants={typingDotVariants}
            animate="animate"
            transition={{
              delay: dot * 0.12,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
