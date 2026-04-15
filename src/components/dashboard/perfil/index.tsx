"use client";

import { useState, type CSSProperties, type ReactNode, type ChangeEvent } from "react";

type PlanType = "pro" | "business" | "free";
type UserType = "empresa" | "independiente";

interface UserProfile {
  type: UserType;
  name: string;
  email: string;
  initials: string;
  phone: string;
  city: string;
  rfc: string;
  specialty?: string[];
  razonSocial?: string;
  direccionFiscal?: string;
  plan: PlanType;
  planRenew?: string;
  logoUrl?: string | null;
}

const mockUser: UserProfile = {
  type: "independiente",
  name: "Fernando Peláez Cruz",
  email: "pelaezcruzandres98@gmail.com",
  initials: "FP",
  phone: "+52 668 123 4567",
  city: "Los Mochis, Sinaloa",
  rfc: "PECF980314AB3",
  specialty: ["Plomería", "Hidráulica", "Calentadores"],
  plan: "pro",
  planRenew: "15 de mayo 2025",
  logoUrl: null,
};

const mockEmpresa: UserProfile = {
  type: "empresa",
  name: "Ferretería Acosta",
  email: "contacto@ferreteriaacosta.mx",
  initials: "FA",
  phone: "+52 668 812 0010",
  city: "Los Mochis, Sinaloa",
  rfc: "FASA920301XY8",
  razonSocial: "Ferretería Acosta S.A. de C.V.",
  direccionFiscal: "Blvd. Macario Gaxiola 450, Los Mochis, Sinaloa",
  plan: "business",
  planRenew: "1 de junio 2025",
  logoUrl: null,
};

const fadeUpStyle = (delay: number): CSSProperties => ({
  animation: `fadeUp 0.45s ease both`,
  animationDelay: `${delay}ms`,
});

const globalStyles = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

const CHIP_COLORS = [
  { bg: "#EEF2FA", color: "#1B3D7A", border: "#D1DCF5" },
  { bg: "#D1FAE5", color: "#16A34A", border: "#A7F3D0" },
  { bg: "#FEF9C3", color: "#D97706", border: "#FDE68A" },
  { bg: "#FFE4E6", color: "#DC2626", border: "#FECACA" },
  { bg: "#F3E8FF", color: "#7C3AED", border: "#DDD6FE" },
];

const IconPhone = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 11.9 19.79 19.79 0 0 1 1.05 3.26 2 2 0 0 1 3.04 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
  </svg>
);
const IconPin = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconDoc = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
  </svg>
);
const IconBuilding = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
  </svg>
);
const IconUpload = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);
const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
);
const IconStar = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);

function Card({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{
      background: "#FFFFFF", borderRadius: 14,
      border: "1px solid #D1D5DB", padding: "18px 20px",
      display: "flex", flexDirection: "column",
      overflow: "hidden", ...style
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 700, color: "#64748B",
      textTransform: "uppercase", letterSpacing: "0.07em",
      margin: "0 0 14px"
    }}>{children}</p>
  );
}

function FieldRow({ icon, label, value, onEdit }: {
  icon: ReactNode; label: string; value: string; onEdit?: () => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #F1F5F9" }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EEF2FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#1B3D7A" }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 10, color: "#64748B", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</p>
        <p style={{ fontSize: 13, color: "#0F172A", margin: 0, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</p>
      </div>
      {onEdit && (
        <button onClick={onEdit} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#1B3D7A", background: "#EEF2FA", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600, flexShrink: 0 }}>
          <IconEdit /> Editar
        </button>
      )}
    </div>
  );
}

const PLANS = {
  pro:      { label: "Plan Pro",      color: "#1B3D7A", bg: "#EEF2FA", border: "#D1DCF5", features: ["Cotizaciones ilimitadas", "Hasta 5 plantillas", "Logo en cotizaciones", "Firma digital"] },
  business: { label: "Plan Business", color: "#16A34A", bg: "#D1FAE5", border: "#A7F3D0", features: ["Vendedores ilimitados", "Múltiples sucursales", "Plantillas por giro", "Logo + firma de empresa"] },
  free:     { label: "Plan Gratis",   color: "#64748B", bg: "#F8FAFC", border: "#D1D5DB", features: ["3 cotizaciones/mes", "1 plantilla activa"] },
};

function LogoCard({ label, onLogoChange }: { label: string; onLogoChange?: (url: string | null) => void }) {
  const [logoFile, setLogoFile] = useState<string | null>(null);
  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setLogoFile(url);
      onLogoChange?.(url);
    }
  };
  return (
    <Card>
      <SectionLabel>{label}</SectionLabel>
      <label style={{
        flex: 1, border: `2px dashed ${logoFile ? "#16A34A" : "#D1DCF5"}`,
        borderRadius: 10, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", background: logoFile ? "#D1FAE5" : "#EEF2FA",
        transition: "all .25s", minHeight: 140
      }}>
        <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleLogo} />
        {logoFile ? (
          <>
            <img src={logoFile} alt="logo" style={{ maxHeight: 90, maxWidth: "75%", objectFit: "contain", borderRadius: 8 }} />
            <p style={{ fontSize: 11, color: "#16A34A", fontWeight: 700, marginTop: 8, margin: "8px 0 2px" }}>Logo cargado ✓</p>
            <p style={{ fontSize: 10, color: "#64748B", margin: 0 }}>Clic para cambiar</p>
          </>
        ) : (
          <>
            <div style={{ width: 46, height: 46, borderRadius: "50%", background: "#D1DCF5", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, color: "#1B3D7A" }}>
              <IconUpload />
            </div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1B3D7A", margin: "0 0 3px" }}>Subir logo</p>
            <p style={{ fontSize: 11, color: "#64748B", margin: 0 }}>PNG, JPG · máx 2MB</p>
            <span style={{ fontSize: 10, color: "#2A5298", fontWeight: 600, marginTop: 8, background: "#D1DCF5", padding: "3px 12px", borderRadius: 20, display: "inline-block" }}>
              Se mostrará en tus cotizaciones
            </span>
          </>
        )}
      </label>
    </Card>
  );
}

function PlanCard({ plan, planRenew, sectionLabel }: { plan: PlanType; planRenew?: string; sectionLabel: string }) {
  const p = PLANS[plan];
  return (
    <Card>
      <SectionLabel>{sectionLabel}</SectionLabel>
      <div style={{ flex: 1, borderRadius: 10, background: p.bg, border: `1.5px solid ${p.border}`, padding: 16, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
            <div style={{ color: p.color }}><IconStar /></div>
            <p style={{ fontSize: 20, fontWeight: 800, color: p.color, margin: 0 }}>{p.label}</p>
          </div>
          <p style={{ fontSize: 12, color: "#64748B", margin: "0 0 12px", lineHeight: 1.5 }}>
            {plan === "pro" && "Acceso completo a plantillas y cotizaciones ilimitadas"}
            {plan === "business" && "Para empresas con múltiples vendedores y sucursales"}
            {plan === "free" && "Acceso limitado — 3 cotizaciones al mes"}
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {p.features.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#0F172A" }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0 }}>
                  <IconCheck />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        {plan === "free"
          ? <button style={{ background: "#1B3D7A", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 14, width: "100%" }}>Mejorar a Pro →</button>
          : <p style={{ fontSize: 11, color: "#64748B", marginTop: 12, textAlign: "center", margin: "12px 0 0" }}>Renueva el {planRenew}</p>
        }
      </div>
    </Card>
  );
}

function PanelIndependiente({ user }: { user: UserProfile }) {
  const plan = PLANS[user.plan];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14, height: 460 }}>
      <Card style={fadeUpStyle(0)}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#D1DCF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: "#1B3D7A", flexShrink: 0 }}>{user.initials}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{user.name}</p>
            <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 7px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{user.email}</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#EEF2FA", color: "#1B3D7A", border: "1px solid #D1DCF5" }}>Independiente</span>
              {user.plan !== "free" && (
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#FEF9C3", color: "#D97706", border: "1px solid #FDE68A", display: "inline-flex", alignItems: "center", gap: 3 }}>
                  <IconStar /> {plan.label}
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "#F1F5F9", marginBottom: 4 }} />
        <FieldRow icon={<IconPhone />} label="WhatsApp / Teléfono" value={user.phone} onEdit={() => {}} />
        <FieldRow icon={<IconPin />} label="Ciudad" value={user.city} onEdit={() => {}} />
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EEF2FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#1B3D7A" }}><IconDoc /></div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 10, color: "#64748B", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>RFC</p>
            <p style={{ fontSize: 13, color: "#0F172A", margin: 0, fontWeight: 500 }}>{user.rfc}</p>
          </div>
          <button style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "#1B3D7A", background: "#EEF2FA", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontWeight: 600 }}>
            <IconEdit /> Editar
          </button>
        </div>
      </Card>

      <div style={fadeUpStyle(80)}><LogoCard label="Logo para mis cotizaciones" /></div>

      <Card style={fadeUpStyle(160)}>
        <SectionLabel>Especialidad y configuración</SectionLabel>
        <div style={{ marginBottom: 10 }}>
          <p style={{ fontSize: 10, color: "#64748B", margin: "0 0 8px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Giro / servicios</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {user.specialty?.map((s, i) => {
              const c = CHIP_COLORS[i % CHIP_COLORS.length];
              return (
                <span key={s} style={{ fontSize: 12, padding: "5px 13px", borderRadius: 20, background: c.bg, color: c.color, border: `1.5px solid ${c.border}`, fontWeight: 700 }}>{s}</span>
              );
            })}
            <button style={{ fontSize: 12, padding: "5px 11px", borderRadius: 20, background: "transparent", color: "#64748B", border: "1.5px dashed #D1D5DB", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 500 }}>
              <IconPlus /> Agregar
            </button>
          </div>
        </div>
        <div style={{ height: 1, background: "#F1F5F9", margin: "6px 0" }} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #F1F5F9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#D1FAE5", display: "flex", alignItems: "center", justifyContent: "center", color: "#16A34A" }}><IconCheck /></div>
            <div>
              <p style={{ fontSize: 10, color: "#64748B", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Firma en cotizaciones</p>
              <p style={{ fontSize: 13, color: "#0F172A", margin: 0, fontWeight: 500 }}>Activada</p>
            </div>
          </div>
          <span style={{ fontSize: 11, color: "#16A34A", background: "#D1FAE5", padding: "3px 10px", borderRadius: 20, fontWeight: 700, border: "1px solid #A7F3D0" }}>ON</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#EEF2FA", display: "flex", alignItems: "center", justifyContent: "center", color: "#1B3D7A" }}><IconDoc /></div>
            <div>
              <p style={{ fontSize: 10, color: "#64748B", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>Plantillas activas</p>
              <p style={{ fontSize: 13, color: "#0F172A", margin: 0, fontWeight: 500 }}>3 plantillas</p>
            </div>
          </div>
          <button style={{ fontSize: 11, color: "#1B3D7A", background: "#EEF2FA", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", fontWeight: 600 }}>Ver todas</button>
        </div>
      </Card>

      <div style={fadeUpStyle(240)}>
        <PlanCard plan={user.plan} planRenew={user.planRenew} sectionLabel="Mi plan" />
      </div>
    </div>
  );
}

function PanelEmpresa({ user }: { user: UserProfile }) {
  const plan = PLANS[user.plan];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14, height: 460 }}>
      <Card style={fadeUpStyle(0)}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
          <div style={{ width: 58, height: 58, borderRadius: 14, background: "#EEF2FA", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#1B3D7A", flexShrink: 0, border: "2px solid #D1DCF5" }}>{user.initials}</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", margin: "0 0 2px" }}>{user.name}</p>
            <p style={{ fontSize: 11, color: "#64748B", margin: "0 0 7px" }}>{user.rfc}</p>
            <div style={{ display: "flex", gap: 5 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#EEF2FA", color: "#1B3D7A", border: "1px solid #D1DCF5" }}>Empresa</span>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "#D1FAE5", color: "#16A34A", border: "1px solid #A7F3D0", display: "inline-flex", alignItems: "center", gap: 3 }}>
                <IconStar /> {plan.label}
              </span>
            </div>
          </div>
        </div>
        <div style={{ height: 1, background: "#F1F5F9", marginBottom: 4 }} />
        <FieldRow icon={<IconBuilding />} label="Razón social" value={user.razonSocial || ""} onEdit={() => {}} />
        <FieldRow icon={<IconPin />} label="Dirección fiscal" value={user.direccionFiscal || ""} onEdit={() => {}} />
        <FieldRow icon={<IconPhone />} label="Teléfono" value={user.phone} onEdit={() => {}} />
      </Card>

      <div style={fadeUpStyle(80)}><LogoCard label="Logo de la empresa" /></div>

      <Card style={fadeUpStyle(160)}>
        <SectionLabel>Sucursales y vendedores</SectionLabel>
        {[
          { name: "Sucursal Centro", city: "Los Mochis, Sinaloa", active: true, main: true },
          { name: "Sucursal Norte",  city: "Guasave, Sinaloa",    active: false, main: false },
        ].map((s) => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, marginBottom: 5, background: s.active ? "#EEF2FA" : "#F8FAFC", border: `1px solid ${s.active ? "#D1DCF5" : "#D1D5DB"}` }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.active ? "#16A34A" : "#64748B", flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: "#0F172A", margin: 0 }}>{s.name}</p>
              <p style={{ fontSize: 10, color: "#64748B", margin: 0 }}>{s.city}</p>
            </div>
            {s.main
              ? <span style={{ fontSize: 10, color: "#1B3D7A", fontWeight: 700, background: "#D1DCF5", padding: "2px 8px", borderRadius: 20 }}>Principal</span>
              : <button style={{ fontSize: 11, color: "#1B3D7A", background: "#EEF2FA", border: "none", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontWeight: 600 }}>Ver</button>
            }
          </div>
        ))}
        <div style={{ height: 1, background: "#F1F5F9", margin: "6px 0 8px" }} />
        {[
          { ini: "RA", name: "Roberto Acosta", role: "Owner",    color: "#1B3D7A", bg: "#D1DCF5" },
          { ini: "MG", name: "María García",   role: "Vendedora", color: "#16A34A", bg: "#D1FAE5" },
        ].map((v) => (
          <div key={v.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", borderBottom: "1px solid #F1F5F9" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: v.color, flexShrink: 0 }}>{v.ini}</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 12, fontWeight: 500, color: "#0F172A", margin: 0 }}>{v.name}</p>
            </div>
            <span style={{ fontSize: 10, color: v.color, fontWeight: 700, background: v.bg, padding: "2px 8px", borderRadius: 20 }}>{v.role}</span>
          </div>
        ))}
        <button style={{ background: "transparent", color: "#1B3D7A", border: "1.5px solid #D1DCF5", borderRadius: 8, padding: "7px", fontSize: 12, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
          <IconPlus /> Invitar vendedor
        </button>
      </Card>

      <div style={fadeUpStyle(240)}>
        <PlanCard plan={user.plan} planRenew={user.planRenew} sectionLabel="Plan de la empresa" />
      </div>
    </div>
  );
}

export default function Perfil() {
  const [userType, setUserType] = useState<UserType>("independiente")

  const user = userType === "empresa" ? mockEmpresa : mockUser

  return (
    <>
      <style>{globalStyles}</style>
      <div style={{
        background: "#E5E5E5",
        minHeight: "100%",
        padding: 20,
        fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, ...fadeUpStyle(0) }}>
          <span style={{
            fontSize: 12,
            fontWeight: 700,
            padding: "5px 16px",
            borderRadius: 20,
            background: userType === "empresa" ? "#D1FAE5" : "#EEF2FA",
            color: userType === "empresa" ? "#16A34A" : "#1B3D7A",
            border: `1.5px solid ${userType === "empresa" ? "#A7F3D0" : "#D1DCF5"}`
          }}>
            {userType === "empresa" ? "Empresa" : "Independiente"}
          </span>

          <span style={{ fontSize: 11, color: "#64748B" }}>
            {userType === "empresa" ? "Cuenta empresarial" : "Cuenta personal"}
          </span>
        </div>

        {userType === "independiente"
          ? <PanelIndependiente user={user} />
          : <PanelEmpresa user={user} />
        }
      </div>
    </>
  )
}
