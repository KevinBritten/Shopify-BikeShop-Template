import React from "react"

import { Layout } from "./layout"
import Hero from "./Hero"
import Intro from "./Intro"
import Services from "./Services"
import Builds from "./Builds"
import Contact from "./Contact"

function Home({ language }) {
  return (
    <Layout language={language}>
      <Hero language={language} />
      <Intro language={language} />
      <Services language={language} />
      <Builds language={language} />
      <Contact language={language} />
    </Layout>
  )
}

export default Home
