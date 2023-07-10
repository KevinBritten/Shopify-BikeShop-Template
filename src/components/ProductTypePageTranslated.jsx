import * as React from "react"
import { Layout } from "./layout"
import { ProductListing } from "./product-listing"
import { Seo } from "./seo"
import { MoreButton } from "./more-button"
import { title } from "./translated-products.module.css"
import { Filters } from "./filters"

export default function ProductsPageTranslated({
  pageContext: { products, language, otherLanguagePage, pageTitle },
}) {
  console.log(products)
  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <div className="my-10">
        <h1 className={title}>{pageTitle}</h1>
        <ProductListing products={products.nodes} />
        {products.pageInfo.hasNextPage && (
          <MoreButton to={`/search#more`}>More products</MoreButton>
        )}{" "}
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext: { pageTitle } }) => (
  <Seo title={`${pageTitle} - Courrier Caverne`} />
)
