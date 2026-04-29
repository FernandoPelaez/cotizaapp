import { motion } from "framer-motion";

import { ayudaEase } from "../animations/ayuda.motion";
import styles from "../Ayuda.module.css";

type SuggestionsListProps = {
  suggestions: string[];
  loading?: boolean;
  compact?: boolean;
  onSelectSuggestion: (text: string) => void;
};

const CHIP_ICONS: Record<string, string> = {
  cotización: "📄",
  productos: "📦",
  envío: "📤",
  envio: "📤",
  cancelar: "❌",
  planes: "💎",
};

function getChipIcon(text: string): string {
  const lower = text.toLowerCase();
  for (const [key, icon] of Object.entries(CHIP_ICONS)) {
    if (lower.includes(key)) return icon;
  }
  return "💬";
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const chipVariants = {
  hidden: {
    opacity: 0,
    y: 10,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: ayudaEase,
    },
  },
};

const compactChipVariants = {
  hidden: {
    opacity: 0,
    y: 5,
    scale: 0.97,
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: ayudaEase,
    },
  },
};

export default function SuggestionsList({
  suggestions,
  loading = false,
  compact = false,
  onSelectSuggestion,
}: SuggestionsListProps) {
  return (
    <motion.div
      className={compact ? styles.suggestionsCompact : styles.suggestionsChips}
      variants={containerVariants}
      initial="hidden"
      animate="show"
      exit={{
        opacity: 0,
        y: -4,
        transition: { duration: 0.18, ease: ayudaEase },
      }}
    >
      {suggestions.map((suggestion) => (
        <motion.button
          key={suggestion}
          type="button"
          onClick={() => onSelectSuggestion(suggestion)}
          disabled={loading}
          className={
            compact
              ? styles.suggestionCompactButton
              : styles.suggestionChipButton
          }
          variants={compact ? compactChipVariants : chipVariants}
          whileHover={{ scale: 1.03, y: -1 }}
          whileTap={{ scale: 0.97 }}
        >
          {!compact && (
            <span className={styles.chipIcon}>{getChipIcon(suggestion)}</span>
          )}
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
}