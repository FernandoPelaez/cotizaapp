"use client"

import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: "Beneficios", href: "#beneficios" },
    { label: "Cómo funciona", href: "#preview" },
    { label: "Planes", href: "#planes" },
    { label: "FAQ", href: "#faq" },
  ]

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[var(--border)]">
      <div className="w-full px-6 h-16 flex items-center justify-between max-w-[1200px] mx-auto">

        <Link
          href="/"
          className="text-lg font-bold text-[var(--primary)] tracking-tight"
        >
          CotizaApp
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="hidden md:block px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
          >
            Iniciar sesión
          </Link>
          <Link
            href="/auth/register"
            className="px-5 py-2.5 rounded-full border border-[var(--border)] bg-white text-[var(--foreground)] text-sm font-medium transition hover:bg-[var(--primary-soft)]"
          >
            Crear cuenta
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[var(--border)] px-6 py-4 flex flex-col gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/auth/login"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2.5 rounded-xl text-sm font-medium text-[var(--foreground)] hover:bg-[var(--primary-soft)]"
          >
            Iniciar sesión
          </Link>
        </div>
      )}
    </header>
  )
}
