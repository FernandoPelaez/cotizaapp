"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type NavItem = {
  label: string
  ids: string[]
  hash: string
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  const links: NavItem[] = [
    {
      label: "Beneficios",
      ids: ["beneficios"],
      hash: "beneficios",
    },
    {
      label: "Funcionalidades",
      ids: ["funcionalidades"],
      hash: "funcionalidades",
    },
    {
      label: "Planes",
      ids: ["planes"],
      hash: "planes",
    },
    {
      label: "Preguntas frecuentes",
      ids: ["faq", "preguntas-frecuentes", "cta"],
      hash: "faq",
    },
  ]

  const getSectionElement = (ids: string[]) => {
    for (const id of ids) {
      const element = document.getElementById(id)
      if (element) return { element, id }
    }
    return null
  }

  const scrollToSection = (item: NavItem) => {
    const found = getSectionElement(item.ids)
    if (!found) return

    const navbarOffset = 88
    const elementTop =
      found.element.getBoundingClientRect().top + window.scrollY - navbarOffset

    setActiveSection(item.hash)

    window.scrollTo({
      top: elementTop,
      behavior: "smooth",
    })

    window.history.pushState(null, "", `#${found.id}`)
  }

  const resetNavbarSelection = () => {
    setActiveSection("")
    window.history.pushState(null, "", "/")
  }

  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.replace("#", "")

      if (!hash) {
        setActiveSection("")
        return
      }

      const matchedItem = links.find((item) => item.ids.includes(hash))
      if (!matchedItem) {
        setActiveSection("")
        return
      }

      setActiveSection(matchedItem.hash)
    }

    const handleScroll = () => {
      if (window.scrollY < 40 && !window.location.hash) {
        setActiveSection("")
      }
    }

    handleInitialHash()

    window.addEventListener("hashchange", handleInitialHash)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("hashchange", handleInitialHash)
      window.removeEventListener("scroll", handleScroll)
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

        .nav-link-btn {
          border: none;
          cursor: pointer;
          font: inherit;
          background: transparent;
          position: relative;
          color: #1B3D7A;
        }

        .nav-link-btn::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          width: 0;
          height: 4px;
          border-radius: 9999px;
          background: #1B3D7A;
          transition: width 0.25s ease;
        }

        .nav-link-btn.active::after {
          width: 28px;
        }
      `}</style>

      <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-[var(--border)]">
        <div className="w-full px-6 h-16 flex items-center justify-between max-w-[1200px] mx-auto">
          <Link
            href="/"
            onClick={resetNavbarSelection}
            className="text-lg font-bold text-[var(--primary)] tracking-tight"
          >
            CotizaApp
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => {
              const isActive = activeSection === link.hash

              return (
                <button
                  key={link.hash}
                  type="button"
                  onClick={() => scrollToSection(link)}
                  className={`nav-link-btn px-4 py-2 text-sm font-medium transition ${
                    isActive ? "active text-[#1B3D7A]" : "text-[#1B3D7A]"
                  }`}
                >
                  {link.label}
                </button>
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

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[var(--border)] px-6 py-4 flex flex-col gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.hash

              return (
                <button
                  key={link.hash}
                  type="button"
                  onClick={() => {
                    scrollToSection(link)
                    setMenuOpen(false)
                  }}
                  className={`nav-link-btn text-left px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? "active text-[#1B3D7A]"
                      : "text-[#1B3D7A] hover:bg-[var(--primary-soft)]"
                  }`}
                >
                  {link.label}
                </button>
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
