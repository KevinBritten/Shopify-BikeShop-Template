import * as React from "react"
import { Layout } from "./layout"
import { ProductListing } from "./product-listing"
import { Seo } from "./seo"
import { MoreButton } from "./more-button"

import { Filters } from "./filters-metafields"
import { graphql } from "gatsby"
import { getCurrencySymbol } from "../utils/format-price"
import debounce from "debounce"
import SearchIcon from "../icons/search"
import SortIcon from "../icons/sort"
import FilterIcon from "../icons/filter"
import CrossIcon from "../icons/cross"

import {
  gridContainer,
  productsContainer,
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

  const [sortKey, setSortKey] = React.useState("createdAt")

  const sortProducts = (products, sortKey) => {
    // Clone the original array to avoid modifying the original data
    const sortedProducts = [...products]

    // Define the sorting function based on the selected sort key
    switch (sortKey) {
      case "createdAt":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        break
      case "ascending_price":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(a.priceRangeV2.minVariantPrice.amount) -
            parseFloat(b.priceRangeV2.minVariantPrice.amount)
        )
        break
      case "descending_price":
        sortedProducts.sort(
          (a, b) =>
            parseFloat(b.priceRangeV2.minVariantPrice.amount) -
            parseFloat(a.priceRangeV2.minVariantPrice.amount)
        )
        break
      case "ascending_title":
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "descending_title":
        sortedProducts.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        // If an invalid sort key is provided, return the original array
        console.warn(`Invalid sort key: ${sortKey}`)
        return sortedProducts
    }
    return sortedProducts
  }

  const currencyCode = getCurrencySymbol(
    products.nodes[0]?.priceRangeV2?.minVariantPrice?.currencyCode
  )

  const [filtersFromMetafields, setFiltersFromMetafields] = React.useState(
    filterMetafields(products.nodes)
  )
  const [filters, setFilters] = React.useState([])

  const [filteredProducts, setFilteredProducts] = React.useState(
    sortProducts([...products.nodes])
  )

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
      setFilteredProducts(sortProducts(products.nodes, sortKey))
    } else {
      setFilteredProducts(
        sortProducts(
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
          }),
          sortKey
        )
      )
    }
  }, [filters, sortKey])

  React.useEffect(() => {
    setFiltersFromMetafields(
      filterMetafields(filteredProducts, filters, filtersFromMetafields)
    )
  }, [filteredProducts])

  const filterCount = React.useMemo(() => {
    return !!Object.entries(filters).find(([key, values]) => values.length > 0)
  }, [filters])

  React.useEffect(() => {}, [filterCount])

  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <button
        className={[
          filterButton,
          filterCount ? activeFilters : undefined,
          "fixed top-0 z-10",
        ].join(" ")}
        onClick={() => setShowModal((show) => !show)}
        // This is hidden because the filters are already visible to
        // screenreaders, so the modal isnt needed.
        aria-hidden
      >
        <FilterIcon />
      </button>
      <div className="my-10">
        <div class={gridContainer}>
          <SearchBar defaultTerm={"filters.term"} setFilters={setFilters} />

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
          <div className={productsContainer}>
            <ProductListing products={filteredProducts} />
          </div>
          <div className={sortSelector}>
            <label>
              <span>Sort by:</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value)}
              >
                <option value="createdAt">
                  {language === "en" ? "New items" : "Nouveaux articles"}
                </option>
                <option value="ascending_price">
                  {language === "en" ? "Price ↑" : "Prix ↑"}
                </option>
                <option value="descending_price">
                  {language === "en" ? "Price ↓" : "Prix ↓"}
                </option>
                <option value="ascending_title">
                  {language === "en" ? "Title ↑" : "Titre ↑"}
                </option>
                <option value="descending_title">
                  {language === "en" ? "Title ↓" : "Titre ↓"}
                </option>
              </select>
            </label>
            <SortIcon className={sortIcon} />
          </div>
        </div>
        {products.pageInfo.hasNextPage && (
          <MoreButton to={`/search#more`}>More products</MoreButton>
        )}{" "}
      </div>
    </Layout>
  )
}

function SearchBar({ defaultTerm, setFilters }) {
  const [term, setTerm] = React.useState(defaultTerm)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilters = React.useCallback(
    debounce((value) => {
      setFilters((filters) => ({ ...filters, term: value }))
    }, 200),
    [setFilters]
  )

  return (
    <form onSubmit={(e) => e.preventDefault()} className={searchForm}>
      <SearchIcon aria-hidden className={searchIcon} />
      <input
        type="text"
        value={term}
        onChange={(e) => {
          setTerm(e.target.value)
          debouncedSetFilters(e.target.value)
        }}
        placeholder="Search..."
      />
      {term ? (
        <button
          className={clearSearch}
          type="reset"
          onClick={() => {
            setTerm("")
            setFilters((filters) => ({ ...filters, term: "" }))
          }}
          aria-label="Clear search query"
        >
          <CrossIcon />
        </button>
      ) : undefined}
    </form>
  )
}

export const Head = ({ pageContext: { language } }) => (
  <Seo title={language === "fr" ? "Recherche" : "Search"} />
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
