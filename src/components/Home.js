import React from "react"

import Hero from "./Hero"
import Intro from "./Intro"
import Services from "./Services"
import Builds from "./Builds"
import Contact from "./Contact"

function Home({ language }) {
  return (
    <div>
      <Hero language={language} />
      <Intro language={language} />
      <Services language={language} />
      <Builds language={language} />
      <Contact language={language} />
    </div>
  )
}

export default Home
