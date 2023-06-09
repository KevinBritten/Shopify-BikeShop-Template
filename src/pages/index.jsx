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

export const Head = () => <Seo />

function IndexPage() {
  return <Home language="fr" />
}

export default IndexPage
