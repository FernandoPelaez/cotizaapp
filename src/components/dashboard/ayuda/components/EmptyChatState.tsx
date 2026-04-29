import { motion } from "framer-motion";

import { ayudaEase } from "../animations/ayuda.motion";
import styles from "../Ayuda.module.css";
import BotIcon from "./BotIcon";
import SuggestionsList from "./SuggestionsList";

type EmptyChatStateProps = {
  suggestions: string[];
  loading: boolean;
  onSelectSuggestion: (text: string) => void;
};

const emptyStateVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.44, ease: ayudaEase },
  },
};

export default function EmptyChatState({
  suggestions,
  loading,
  onSelectSuggestion,
}: EmptyChatStateProps) {
  return (
    <motion.div
      className={styles.emptyState}
      variants={emptyStateVariants}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        y: -6,
        transition: { duration: 0.2, ease: ayudaEase },
      }}
    >

      <motion.div className={styles.emptyIcon} variants={itemVariants}>
        <BotIcon size={28} />
      </motion.div>

      <motion.p className={styles.emptyTitle} variants={itemVariants}>
        ¡Hola! ¿En qué puedo ayudarte?
      </motion.p>

      <motion.p className={styles.emptyDescription} variants={itemVariants}>
        Selecciona una pregunta frecuente o escribe la tuya
      </motion.p>

      <SuggestionsList
        suggestions={suggestions}
        loading={loading}
        onSelectSuggestion={onSelectSuggestion}
      />
    </motion.div>
  );
}
