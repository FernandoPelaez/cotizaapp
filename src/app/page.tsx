import Navbar from "@/components/landing/layout/Navbar"
import Hero from "@/components/landing/hero/Hero"
import Beneficios from "@/components/landing/beneficios/Beneficios"
import Preview from "@/components/landing/preview/Preview"
import Planes from "@/components/landing/planes/Planes"
import Segmentacion from "@/components/landing/segmentacion/Segmentacion"
import CTA from "@/components/landing/cta/CTA"
import Footer from "@/components/landing/footer/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Beneficios />
      <div id="funcionalidades"><Preview /></div>
      <Planes />
      <Segmentacion />
      <div id="faq"><CTA /></div>
      <Footer />
    </>
  )
}
