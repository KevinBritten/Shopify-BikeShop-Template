import * as React from "react"
import { graphql } from "gatsby"
import { Seo } from "../components/seo"
import Home from "../components/Home"

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`

export const Head = () => (
  <>
    <Seo
      title="Cycle Sanctuary - Magasin de vélos & Café à Montréal"
      description="Cycle Sanctuary est votre guichet unique pour des vélos de qualité et du café délicieux. Explorez notre gamme de vélos et rejoignez-nous au café."
      pathname="/"
    />
  </>
)

function IndexPage() {
  React.useEffect(() => {
    document.documentElement.lang = "fr"
  }, [])
  return <Home language="fr" />
}

export default IndexPage
