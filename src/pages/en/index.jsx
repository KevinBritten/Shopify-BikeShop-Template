import * as React from "react"
import { Seo } from "../../components/seo"
import Home from "../../components/Home"

export const Head = () => (
  <Seo
    title="Courrier Caverne - Montreal Bike Store & Café"
    description="Courrier Caverne is your one-stop-shop for quality bikes and delicious coffee. Explore our range of bikes and join us in the café."
    pathname="/en"
    lang="en"
  />
)

function IndexPage() {
  return <Home language="en" />
}

export default IndexPage
