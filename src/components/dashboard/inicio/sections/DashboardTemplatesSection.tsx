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
          0%   { 
            transform: scale(1);    
            color: #3b5bdb;
            text-shadow: 0 0 6px rgba(59,91,219,0.4), 0 0 12px rgba(59,91,219,0.2);
          }
          30%  { 
            transform: scale(1.06); 
            color: #4dabf7;
            text-shadow: 0 0 8px rgba(77,171,247,0.9), 0 0 20px rgba(77,171,247,0.6), 0 0 35px rgba(77,171,247,0.3);
          }
          60%  { 
            transform: scale(0.97); 
            color: #74c0fc;
            text-shadow: 0 0 6px rgba(116,192,252,0.7), 0 0 14px rgba(116,192,252,0.4);
          }
          100% { 
            transform: scale(1);    
            color: #3b5bdb;
            text-shadow: 0 0 6px rgba(59,91,219,0.4), 0 0 12px rgba(59,91,219,0.2);
          }
        }

        @keyframes arrow-nudge {
          0%   { transform: translateX(0); filter: drop-shadow(0 0 3px rgba(59,91,219,0.4)); }
          30%  { transform: translateX(4px); filter: drop-shadow(0 0 6px rgba(77,171,247,0.9)); }
          60%  { transform: translateX(-1px); filter: drop-shadow(0 0 4px rgba(116,192,252,0.6)); }
          100% { transform: translateX(0); filter: drop-shadow(0 0 3px rgba(59,91,219,0.4)); }
        }

        .pulse-link {
          animation: pulse-invite 2s ease-in-out infinite;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        .pulse-link:hover {
          animation: none;
          color: #4dabf7;
          text-shadow: 0 0 10px rgba(77,171,247,1), 0 0 25px rgba(77,171,247,0.7), 0 0 45px rgba(77,171,247,0.4);
          transition: all 0.2s ease;
        }

        .pulse-link .arrow-icon {
          animation: arrow-nudge 2s ease-in-out infinite;
        }

        .pulse-link:hover .arrow-icon {
          animation: none;
          transform: translateX(3px);
          filter: drop-shadow(0 0 6px rgba(77,171,247,1));
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

        <div className="-mt-5 ml-[170px] inline-block rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
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