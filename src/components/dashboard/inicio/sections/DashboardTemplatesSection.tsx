import Link from "next/link"
import { ArrowRight } from "lucide-react"
import TemplatePreviewClasica from "../templates/TemplatePreviewClasica"
import TemplatePreviewPro from "../templates/TemplatePreviewPro"
import TemplatePreviewPremium from "../templates/TemplatePreviewPremium"
import TemplatePreviewPremiumAlt from "../templates/TemplatePreviewPremiumAlt"

export default function DashboardTemplatesSection() {
  return (
    <section className="w-full -mt-1">
      <style>{`
        @keyframes pulse-invite {
          0% {
            transform: scale(1);
            color: hsl(var(--primary, 216 64% 29%));
            text-shadow:
              0 0 6px hsl(var(--primary, 216 64% 29%) / 0.35),
              0 0 12px hsl(var(--primary, 216 64% 29%) / 0.18);
          }
          30% {
            transform: scale(1.06);
            color: hsl(var(--primary-hover, 214 57% 38%));
            text-shadow:
              0 0 8px hsl(var(--primary-hover, 214 57% 38%) / 0.55),
              0 0 20px hsl(var(--primary-hover, 214 57% 38%) / 0.32),
              0 0 35px hsl(var(--primary-hover, 214 57% 38%) / 0.18);
          }
          60% {
            transform: scale(0.97);
            color: hsl(var(--primary-light, 214 91% 75%));
            text-shadow:
              0 0 6px hsl(var(--primary-light, 214 91% 75%) / 0.45),
              0 0 14px hsl(var(--primary-light, 214 91% 75%) / 0.26);
          }
          100% {
            transform: scale(1);
            color: hsl(var(--primary, 216 64% 29%));
            text-shadow:
              0 0 6px hsl(var(--primary, 216 64% 29%) / 0.35),
              0 0 12px hsl(var(--primary, 216 64% 29%) / 0.18);
          }
        }

        @keyframes arrow-nudge {
          0% {
            transform: translateX(0);
            filter: drop-shadow(0 0 3px hsl(var(--primary, 216 64% 29%) / 0.35));
          }
          30% {
            transform: translateX(4px);
            filter: drop-shadow(0 0 6px hsl(var(--primary-hover, 214 57% 38%) / 0.55));
          }
          60% {
            transform: translateX(-1px);
            filter: drop-shadow(0 0 4px hsl(var(--primary-light, 214 91% 75%) / 0.45));
          }
          100% {
            transform: translateX(0);
            filter: drop-shadow(0 0 3px hsl(var(--primary, 216 64% 29%) / 0.35));
          }
        }

        .pulse-link {
          animation: pulse-invite 2s ease-in-out infinite;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }

        .pulse-link:hover {
          animation: none;
          color: hsl(var(--primary-hover, 214 57% 38%));
          text-shadow:
            0 0 10px hsl(var(--primary-hover, 214 57% 38%) / 0.55),
            0 0 25px hsl(var(--primary-hover, 214 57% 38%) / 0.35),
            0 0 45px hsl(var(--primary-hover, 214 57% 38%) / 0.22);
          transition: all 0.2s ease;
        }

        .pulse-link .arrow-icon {
          animation: arrow-nudge 2s ease-in-out infinite;
        }

        .pulse-link:hover .arrow-icon {
          animation: none;
          transform: translateX(3px);
          filter: drop-shadow(0 0 6px hsl(var(--primary-hover, 214 57% 38%) / 0.55));
          transition: all 0.2s ease;
        }
      `}</style>

      <div className="w-full">
        <div className="flex items-start">
          <Link
            href="/plantillas"
            className="pulse-link shrink-0 text-[12px] font-semibold"
          >
            Ver todas las plantillas
            <ArrowRight className="arrow-icon h-4 w-4 shrink-0" />
          </Link>
        </div>

        <div
          className="-mt-5 ml-[170px] inline-block rounded-3xl border px-4 py-3"
          style={{
            backgroundColor: "hsl(var(--card, 0 0% 100%))",
            borderColor: "hsl(var(--border, 214 32% 91%) / 0.55)",
            boxShadow: "0 8px 24px rgba(15, 23, 42, 0.05)",
          }}
        >
          <div className="flex items-start gap-4">
            <TemplatePreviewClasica />
            <TemplatePreviewPro />
            <TemplatePreviewPremium />
            <TemplatePreviewPremiumAlt />
          </div>
        </div>
      </div>
    </section>
  )
}
