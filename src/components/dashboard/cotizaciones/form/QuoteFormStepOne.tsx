"use client"

type QuoteFormStepOneProps = {
  title: string
  description: string
  companyName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  clientRFC: string
  clientAddress: string
  validUntil: string
  inputCls: string
  labelCls: string
  sectionCls: string
  onTitleChange: (value: string) => void
  onDescriptionChange: (value: string) => void
  onCompanyNameChange: (value: string) => void
  onClientNameChange: (value: string) => void
  onClientEmailChange: (value: string) => void
  onClientPhoneChange: (value: string) => void
  onClientRFCChange: (value: string) => void
  onClientAddressChange: (value: string) => void
  onValidUntilChange: (value: string) => void
  onNext: () => void
}

export default function QuoteFormStepOne({
  title,
  description,
  companyName,
  clientName,
  clientEmail,
  clientPhone,
  clientRFC,
  clientAddress,
  validUntil,
  inputCls,
  labelCls,
  sectionCls,
  onTitleChange,
  onDescriptionChange,
  onCompanyNameChange,
  onClientNameChange,
  onClientEmailChange,
  onClientPhoneChange,
  onClientRFCChange,
  onClientAddressChange,
  onValidUntilChange,
  onNext,
}: QuoteFormStepOneProps) {
  return (
    <div className="space-y-3.5 p-4">
      <div>
        <p className={sectionCls}>Datos generales</p>

        <div className="space-y-2">
          <div>
            <label className={labelCls}>Título del documento</label>
            <input
              className={inputCls}
              placeholder="Ej. Cotización — Proyecto residencial"
              value={title}
              onChange={(e) => onTitleChange(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Descripción</label>
            <input
              className={inputCls}
              placeholder="Breve descripción de la cotización"
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Nombre de tu empresa</label>
            <input
              className={inputCls}
              placeholder="Ej. Studio Creativo S.A."
              value={companyName}
              onChange={(e) => onCompanyNameChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        <p className={sectionCls}>Datos del cliente</p>

        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Cliente</label>
              <input
                className={inputCls}
                placeholder="Nombre completo"
                value={clientName}
                onChange={(e) => onClientNameChange(e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>Email cliente</label>
              <input
                className={inputCls}
                placeholder="correo@cliente.com"
                type="email"
                value={clientEmail}
                onChange={(e) => onClientEmailChange(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Teléfono cliente</label>
              <input
                className={inputCls}
                placeholder="+52 667 123 4567"
                type="tel"
                value={clientPhone}
                onChange={(e) => onClientPhoneChange(e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>RFC cliente</label>
              <input
                className={inputCls}
                placeholder="RFC opcional"
                value={clientRFC}
                onChange={(e) => onClientRFCChange(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Dirección cliente</label>
            <input
              className={inputCls}
              placeholder="Dirección o ubicación"
              value={clientAddress}
              onChange={(e) => onClientAddressChange(e.target.value)}
            />
          </div>

          <div>
            <label className={labelCls}>Vigencia</label>
            <input
              className={inputCls}
              type="date"
              value={validUntil}
              onChange={(e) => onValidUntilChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start pt-1">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-[#1B3D7A] px-5 text-[12px] font-semibold !text-white shadow-sm shadow-blue-950/10 transition-all hover:-translate-y-0.5 hover:bg-[#16326a] focus:outline-none focus:ring-2 focus:ring-blue-200 active:translate-y-0"
          style={{ color: "#FFFFFF" }}
        >
          <span className="!text-white" style={{ color: "#FFFFFF" }}>
            Siguiente
          </span>

          <svg
            className="h-3 w-3 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>
    </div>
  )
}
