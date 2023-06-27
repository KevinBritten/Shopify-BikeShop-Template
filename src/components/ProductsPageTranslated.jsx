import * as React from "react"
import { Layout } from "./layout"
import { ProductListing } from "./product-listing"
import { Seo } from "./seo"
import { MoreButton } from "./more-button"
import { title } from "./translated-products.module.css"

export default function ProductsPageTranslated({ pageContext: { products } }) {
  return (
    <Layout>
      <h1 className={title}>Products</h1>
      <ProductListing products={products.nodes} />
      {products.pageInfo.hasNextPage && (
        <MoreButton to={`/search#more`}>More products</MoreButton>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="All Products" />
