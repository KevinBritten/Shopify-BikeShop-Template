import * as React from "react"
import { Seo } from "../../components/seo"
import Home from "../../components/Home"

export const Head = () => (
  <Seo
    title="Cycle Sanctuary - Montreal Bike Store & Café"
    description="Cycle Sanctuary is your one-stop-shop for quality bikes and delicious coffee. Explore our range of bikes and join us in the café."
    pathname="/en"
  />
)

function IndexPage() {
  React.useEffect(() => {
    document.documentElement.lang = "en"
  }, [])
  return <Home language="en" />
}

export default IndexPage
