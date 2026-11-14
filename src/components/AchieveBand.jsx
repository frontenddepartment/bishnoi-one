import Reveal from './ui/Reveal.jsx'
import './AchieveBand.css'

/* Full-width photo (the Bishnoi One stage) with an orange caption strip. */
export default function AchieveBand() {
  return (
    <Reveal as="figure" className="achieve" direction="none">
      <img src="/achieve.png" alt="" loading="lazy" />
      <figcaption className="achieve__band">
        <span>When every system is connected,</span>
        <b>every team achieves more.</b>
      </figcaption>
    </Reveal>
  )
}
