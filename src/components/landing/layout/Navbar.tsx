"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const links = [
    { label: "Beneficios", href: "#beneficios", id: "beneficios" },
    { label: "Cómo funciona", href: "#preview", id: "preview" },
    { label: "Planes", href: "#planes", id: "planes" },
    { label: "FAQ", href: "#faq", id: "faq" },
  ]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const navbarOffset = 88
    const elementTop =
      element.getBoundingClientRect().top + window.pageYOffset - navbarOffset

    window.scrollTo({
      top: elementTop,
      behavior: "smooth",
    })

    window.history.pushState(null, "", `#${id}`)
    setActiveSection(id)
  }

  useEffect(() => {
    const updateActiveSection = () => {
      const sections = links
        .map((link) => document.getElementById(link.id))
        .filter(Boolean) as HTMLElement[]

      const scrollPosition = window.scrollY + 140

      let currentSection = ""

      for (const section of sections) {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          currentSection = section.id
          break
        }
      }

      setActiveSection(currentSection)
    }

    const handleInitialHash = () => {
      const hash = window.location.hash.replace("#", "")
      if (!hash) return

      const target = document.getElementById(hash)
      if (!target) return

      const navbarOffset = 88
      const elementTop =
        target.getBoundingClientRect().top + window.pageYOffset - navbarOffset

      window.scrollTo({
        top: elementTop,
        behavior: "auto",
      })

      setActiveSection(hash)
    }

    handleInitialHash()
    updateActiveSection()

    window.addEventListener("scroll", updateActiveSection)

    return () => {
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [])

  return (
    <>
      <style>{`
        .login-btn {
          padding: 0.8em 1.6em;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          color: #1B3D7A;
          transition: all 700ms ease;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          outline: 2px solid #1B3D7A;
          background: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .login-btn:hover {
          color: #ffffff;
          transform: scale(1.04);
          outline: 2px solid #2a5298;
          box-shadow: 4px 5px 17px -4px rgba(27, 61, 122, 0.55);
        }

        .login-btn::before {
          content: "";
          position: absolute;
          left: -50px;
          top: 0;
          width: 0;
          height: 100%;
          background-color: #1B3D7A;
          transform: skewX(45deg);
          z-index: -1;
          transition: width 700ms ease;
        }

        .login-btn:hover::before {
          width: 250%;
        }

        .login-btn-mobile {
          padding: 0.9em 1.4em;
          border: none;
          border-radius: 16px;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          color: #1B3D7A;
          transition: all 700ms ease;
          font-size: 14px;
          position: relative;
          overflow: hidden;
          outline: 2px solid #1B3D7A;
          background: white;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        .login-btn-mobile:hover {
          color: #ffffff;
          transform: scale(1.02);
          outline: 2px solid #2a5298;
          box-shadow: 4px 5px 17px -4px rgba(27, 61, 122, 0.55);
        }

        .login-btn-mobile::before {
          content: "";
          position: absolute;
          left: -50px;
          top: 0;
          width: 0;
          height: 100%;
          background-color: #1B3D7A;
          transform: skewX(45deg);
          z-index: -1;
          transition: width 700ms ease;
        }

        .login-btn-mobile:hover::before {
          width: 250%;
        }
      `}</style>

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
            {links.map((link) => {
              const isActive = activeSection === link.id

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary)]"
                      : "text-[var(--primary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/auth/signin"
              className="hidden md:inline-flex login-btn"
            >
              Iniciar sesión
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              <span
                className={`block w-5 h-0.5 bg-[var(--primary)] transition-all ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[var(--primary)] transition-all ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-[var(--primary)] transition-all ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[var(--border)] px-6 py-4 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.id

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                    setMenuOpen(false)
                  }}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "bg-[var(--primary-soft)] text-[var(--primary)]"
                      : "text-[var(--primary)] hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}

            <Link
              href="/auth/signin"
              onClick={() => setMenuOpen(false)}
              className="mt-2 login-btn-mobile"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </header>
    </>
  )
}
