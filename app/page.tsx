import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import DrugAI from '@/components/DrugAI'
import Research from '@/components/Research'
import Imagery from '@/components/Imagery'
import Mission from '@/components/Mission'
import Credibility from '@/components/Credibility'
import Team from '@/components/Team'
import Partners from '@/components/Partners'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <DrugAI />
        <Research />
        <Imagery />
        <Mission />
        <Credibility />
        <Team />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
