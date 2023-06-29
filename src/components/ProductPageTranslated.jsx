import * as React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "./layout"
import isEqual from "lodash.isequal"
import { GatsbyImage, getSrc } from "gatsby-plugin-image"
import { StoreContext } from "../context/store-context"
import { AddToCart } from "./add-to-cart"
import { NumericInput } from "./numeric-input"
import { formatPrice } from "../utils/format-price"
import { Seo } from "./seo"
import { CgChevronRight as ChevronIcon } from "react-icons/cg"
import {
  productBox,
  container,
  header,
  productImageWrapper,
  productImageList,
  productImageListItem,
  scrollForMore,
  noImagePreview,
  optionsWrapper,
  priceValue,
  selectVariant,
  labelFont,
  breadcrumb,
  tagList,
  addToCartStyle,
  metaSection,
  productDescription,
} from "./product-page.module.css"

export default function Product({
  data: { product, translatedProduct },
  pageContext: { language, otherLanguagePage },
}) {
  const {
    // options,
    variants,
    variants: [initialVariant],
    priceRangeV2,
    images,
  } = product
  const {
    title,
    description,
    options: translatedOptions,
  } = language === "en" ? product : translatedProduct

  //add translated data to options object
  const options = product.options.map((option, i) => {
    return {
      ...option,
      translatedValues: translatedOptions[i].values,
      translatedName: translatedOptions[i].name,
    }
  })

  const { client } = React.useContext(StoreContext)

  const [variant, setVariant] = React.useState({ ...initialVariant })
  const [quantity, setQuantity] = React.useState(1)

  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant

  const [available, setAvailable] = React.useState(
    productVariant.availableForSale
  )

  const checkAvailablity = React.useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        const result =
          fetchedProduct?.variants.filter(
            (variant) => variant.id === productVariant.storefrontId
          ) ?? []

        if (result.length > 0) {
          setAvailable(result[0].available)
        }
      })
    },
    [productVariant.storefrontId, client.product]
  )

  const handleOptionChange = (index, event) => {
    const value = event.target.value

    if (value === "") {
      return
    }

    const currentOptions = [...variant.selectedOptions]

    currentOptions[index] = {
      ...currentOptions[index],
      value,
    }

    const selectedVariant = variants.find((variant) => {
      return isEqual(currentOptions, variant.selectedOptions)
    })

    setVariant({ ...selectedVariant })
  }

  React.useEffect(() => {
    checkAvailablity(product.storefrontId)
  }, [productVariant.storefrontId, checkAvailablity, product.storefrontId])

  const price = formatPrice(
    priceRangeV2.minVariantPrice.currencyCode,
    variant.price
  )

  const hasVariants = variants.length > 1
  const hasImages = images.length > 0
  const hasMultipleImages = true || images.length > 1

  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <div className={container}>
        <div className={productBox}>
          {hasImages && (
            <div className={productImageWrapper}>
              <div
                role="group"
                aria-label="gallery"
                aria-describedby="instructions"
              >
                <ul className={productImageList}>
                  {images.map((image, index) => (
                    <li
                      key={`product-image-${image.id}`}
                      className={productImageListItem}
                    >
                      <GatsbyImage
                        objectFit="contain"
                        loading={index === 0 ? "eager" : "lazy"}
                        alt={
                          image.altText
                            ? image.altText
                            : `Product Image of ${title} #${index + 1}`
                        }
                        image={image.gatsbyImageData}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {hasMultipleImages && (
                <div className={scrollForMore} id="instructions">
                  <span aria-hidden="true">←</span> scroll for more{" "}
                  <span aria-hidden="true">→</span>
                </div>
              )}
            </div>
          )}
          {!hasImages && (
            <span className={noImagePreview}>No Preview image</span>
          )}
          <div>
            {/* <div className={breadcrumb}>
              <Link to={product.productTypeSlug}>{product.productType}</Link>
              <ChevronIcon size={12} />
            </div> */}
            <h1 className={header}>{title}</h1>
            <p className={productDescription}>{description}</p>
            <h2 className={priceValue}>
              <span>{price}</span>
            </h2>
            <fieldset className={optionsWrapper}>
              {hasVariants &&
                options.map(
                  (
                    { id, name, values, translatedName, translatedValues },
                    index
                  ) => (
                    <div className={selectVariant} key={id}>
                      <select
                        aria-label="Variants"
                        onChange={(event) => handleOptionChange(index, event)}
                      >
                        <option value="">{`Select ${translatedName}`}</option>
                        {values.map((value, i) => (
                          <option value={value} key={`${name}-${value}`}>
                            {translatedValues[i]}
                          </option>
                        ))}
                      </select>
                    </div>
                  )
                )}
            </fieldset>
            <div className={addToCartStyle}>
              <NumericInput
                aria-label="Quantity"
                onIncrement={() => setQuantity((q) => Math.min(q + 1, 20))}
                onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
                onChange={(event) => setQuantity(event.currentTarget.value)}
                value={quantity}
                min="1"
                max="20"
              />
              <AddToCart
                variantId={productVariant.storefrontId}
                quantity={quantity}
                available={available}
              />
            </div>
            {/* <div className={metaSection}>
              <span className={labelFont}>Type</span>
              <span className={tagList}>
                <Link to={product.productTypeSlug}>{product.productType}</Link>
              </span>
              <span className={labelFont}>Tags</span>
              <span className={tagList}>
                {product.tags.map((tag) => (
                  <Link to={`/search?t=${tag}`}>{tag}</Link>
                ))}
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { product, translatedProduct } }) => {
  const {
    images: [firstImage],
  } = product
  const { title, description } = translatedProduct

  return (
    <>
      {firstImage ? (
        <Seo
          title={title}
          description={description}
          image={getSrc(firstImage.gatsbyImageData)}
        />
      ) : undefined}
    </>
  )
}

export const query = graphql`
  query ($storefrontId: String!) {
    product: shopifyProduct(storefrontId: { eq: $storefrontId }) {
      title
      description
      productType
      productTypeSlug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}"
      )
      tags
      priceRangeV2 {
        maxVariantPrice {
          amount
          currencyCode
        }
        minVariantPrice {
          amount
          currencyCode
        }
      }
      storefrontId
      images {
        # altText
        id
        gatsbyImageData(layout: CONSTRAINED, width: 640, aspectRatio: 1)
      }
      variants {
        availableForSale
        storefrontId
        title
        price
        selectedOptions {
          name
          value
        }
      }
      options {
        name
        values
        id
      }
    }
    translatedProduct: shopifyTranslatedProduct(
      storefrontId: { eq: $storefrontId }
    ) {
      title
      description
      id
      metafields {
        edges {
          node {
            key
            value
          }
        }
      }
      handle
      variants {
        edges {
          node {
            selectedOptions {
              name
              value
            }
            title
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`
