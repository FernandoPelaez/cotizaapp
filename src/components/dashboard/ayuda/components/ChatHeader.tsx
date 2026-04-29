import BotIcon from "./BotIcon";
import styles from "../Ayuda.module.css";

export default function ChatHeader() {
  return (
    <div className={styles.chatHeader}>
      <div className={styles.botAvatar}>
        <BotIcon size={20} />
      </div>

      <div className={styles.headerContent}>
        <span className={styles.headerTitle}>Asistente de CotizaApp</span>

        <span className={styles.headerStatus}>
          <span className={styles.statusDot} />
          En línea
        </span>
      </div>

      <span className={styles.supportBadge}>Soporte 24/7</span>
    </div>
  );
}
