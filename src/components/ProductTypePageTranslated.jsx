import * as React from "react"
import { Layout } from "./layout"
import { ProductListing } from "./product-listing"
import { Seo } from "./seo"
import { MoreButton } from "./more-button"
import { title } from "./translated-products.module.css"
import { Filters } from "./filters-metafields"
import { graphql } from "gatsby"
import { getCurrencySymbol } from "../utils/format-price"

import FilterIcon from "../icons/filter"
import CrossIcon from "../icons/cross"

import {
  visuallyHidden,
  main,
  search,
  searchIcon,
  sortSelector,
  results,
  productList as productListStyle,
  productListItem,
  pagination,
  paginationButton,
  progressStyle,
  resultsStyle,
  filterStyle,
  clearSearch,
  searchForm,
  sortIcon,
  filterButton,
  filterTitle,
  modalOpen,
  activeFilters,
  filterWrap,
  emptyState,
} from "./search-page.module.css"

export default function ProductsPageTranslated({
  pageContext: { products, language, otherLanguagePage, productType },
  data: {
    meta: { distinct },
  },
}) {
  //get an array of each metafield's possible values.
  const filterMetafields = (
    productNodes,
    filters = [],
    previousFiltersFromMetafields = []
  ) => {
    return distinct
      .filter((metafield) => !(metafield === "product_type"))
      .map((metafield) => {
        // If the metafield has a filter applied already, use the previous filter
        const previousFilter = previousFiltersFromMetafields.find(
          (filter) => filter.key === metafield
        )
        if (
          previousFilter &&
          filters[metafield] &&
          filters[metafield].length > 0
        ) {
          return previousFilter
        }
        const values = new Set()
        //add all values to set if one is selected already to allow customer to select multiple options of same type
        productNodes.forEach((product) => {
          // Check if product.metafields contains an object with key:metafield
          const metafieldObj = product.metafields.find(
            (m) => m.key === metafield
          )
          if (metafieldObj) {
            // Add the value to the set
            values.add(metafieldObj.value)
          }
        })
        return {
          key: metafield,
          values: [...values],
        }
      })
  }

  const currencyCode = getCurrencySymbol(
    products.nodes[0]?.priceRangeV2?.minVariantPrice?.currencyCode
  )

  const [filtersFromMetafields, setFiltersFromMetafields] = React.useState(
    filterMetafields(products.nodes)
  )
  const [filters, setFilters] = React.useState([])
  const [filteredProducts, setFilteredProducts] = React.useState([
    ...products.nodes,
  ])
  // This modal is only used on mobile
  const [showModal, setShowModal] = React.useState(false)

  // Scroll up when navigating
  React.useEffect(() => {
    if (!showModal) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
        // eslint-disable-next-line react-hooks/exhaustive-deps
      })
    }
  }, [products, showModal])

  // Stop page from scrolling when modal is visible
  React.useEffect(() => {
    if (showModal) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
  }, [showModal])

  React.useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setFilteredProducts(products.nodes)
    } else {
      setFilteredProducts(
        products.nodes.filter((product) => {
          return Object.entries(filters).every(([key, values]) => {
            // Handle min/max price
            if (key === "minPrice") {
              return values
                ? parseFloat(product.priceRangeV2.minVariantPrice.amount) >=
                    values
                : true
            }
            if (key === "maxPrice") {
              return values
                ? parseFloat(product.priceRangeV2.minVariantPrice.amount) <=
                    values
                : true
            }
            // If no values specified for the key, then all products with this key are acceptable
            if (values.length === 0) {
              return true
            }

            // Find corresponding metafield in the product's metafields
            const metafield = product.metafields.find(
              (metafield) => metafield.key === key
            )

            // If metafield is not found or its value is not in the filter's values, return false
            if (!metafield || !values.includes(metafield.value)) {
              return false
            }

            // Otherwise, this filter is satisfied
            return true
          })
        })
      )
    }
  }, [filters])

  React.useEffect(() => {
    setFiltersFromMetafields(
      filterMetafields(filteredProducts, filters, filtersFromMetafields)
    )
  }, [filteredProducts])

  const filterCount = React.useMemo(() => {
    return !!Object.entries(filters).find(([key, values]) => values.length > 0)
  }, [filters])

  React.useEffect(() => {
    console.log(filterCount)
  }, [filterCount])

  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <button
        className={[
          filterButton,
          filterCount ? activeFilters : undefined,
          "fixed",
        ].join(" ")}
        onClick={() => setShowModal((show) => !show)}
        // This is hidden because the filters are already visible to
        // screenreaders, so the modal isnt needed.
        aria-hidden
      >
        <FilterIcon />
      </button>
      <div className="my-10">
        <h1 className={title}>{productType}</h1>
        <div className="flex">
          <section className={[filterStyle, showModal && modalOpen].join(" ")}>
            <div className={filterTitle}>
              <h2>Filter</h2>
              <button aria-hidden onClick={() => setShowModal(false)}>
                <CrossIcon />
              </button>
            </div>
            <div className={filterWrap}>
              <Filters
                setFilters={setFilters}
                filters={filters}
                filtersFromMetafields={filtersFromMetafields}
                // tags={tags}
                // vendors={vendors}
                // productTypes={productTypes}
                currencyCode={currencyCode}
              />
            </div>
          </section>
          <ProductListing products={filteredProducts} />
        </div>
        {products.pageInfo.hasNextPage && (
          <MoreButton to={`/search#more`}>More products</MoreButton>
        )}{" "}
      </div>
    </Layout>
  )
}

export const Head = ({ pageContext: { productType } }) => (
  <Seo title={`${productType} - Courrier Caverne`} />
)

export const query = graphql`
  query ($productType: String, $language: String) {
    meta: allShopifyTranslatedProduct(
      filter: {
        locale: { eq: $language }
        metafields: { elemMatch: { value: { eq: $productType } } }
      }
    ) {
      distinct(field: metafields___key)
    }
  }
`
