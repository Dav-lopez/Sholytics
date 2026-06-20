import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Marquee from '@/components/Marquee'
import About from '@/components/About'
import MedAICare from '@/components/MedAICare'
import Research from '@/components/Research'
import Impact from '@/components/Impact'
import Imagery from '@/components/Imagery'
import Mission from '@/components/Mission'
import Divisions from '@/components/Divisions'
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
        <MedAICare />
        <Research />
        <Impact />
        <Imagery />
        <Mission />
        <Divisions />
        <Credibility />
        <Team />
        <Partners />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
