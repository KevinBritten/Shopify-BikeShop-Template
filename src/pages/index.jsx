import * as React from "react"
import { graphql } from "gatsby"
// import { Layout } from "../components/layout"
// import { ProductListing } from "../components/product-listing"
// import { Seo } from "../components/seo"
import Home from "../components/Home"
// import {
//   container,
//   intro,
//   callOut,
//   callToAction,
//   deployButton,
// } from "./index.module.css"

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`

// export default function IndexPage({ data }) {
//   return (
//     <Layout>
//       <Hero />
//       <Intro />
//       <Services />
//       <Builds />
//       <Contact />
//       {/* <ProductListing products={data?.shopifyCollection?.products} /> */}
//     </Layout>
//   )
// }

// export const Head = () => <Seo />

function IndexPage() {
  return <Home language="fr" />
}

export default IndexPage
