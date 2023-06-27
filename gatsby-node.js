const path = require("path")
const slugify = require("@sindresorhus/slugify")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      collections: allShopifyCollection {
        edges {
          node {
            id
            title
            description
            descriptionHtml
            storefrontId
            handle
          }
        }
      }
      translatedCollections: allShopifyTranslatedCollection {
        edges {
          node {
            title
            description
            descriptionHtml
            locale
            storefrontId
            handle
          }
        }
      }
      products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }) {
        nodes {
          ...ProductCard
          storefrontId
        }
        pageInfo {
          hasNextPage
        }
      }
      translatedProducts: allShopifyTranslatedProduct {
        nodes {
          ...TranslatedProductCard
          handle
          storefrontId
          metafields {
            edges {
              node {
                key
                value
              }
            }
          }
        }
      }
    }

    fragment ProductCard on ShopifyProduct {
      id
      title
      slug: gatsbyPath(
        filePath: "/products/{ShopifyProduct.productType}/{ShopifyProduct.handle}"
      )
      images {
        id
        altText
        gatsbyImageData(aspectRatio: 1, width: 640)
      }
      priceRangeV2 {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      vendor
    }

    fragment TranslatedProductCard on ShopifyTranslatedProduct {
      id
      title
    }
  `)

  if (result.errors) {
    throw new Error(result.errors)
  }

  function createTranslatedSlug(node) {
    const translatedProductType = node.metafields.edges.filter(
      (edge) => (edge.node.key = "frenchtype")
    )[0].node.value
    const { handle } = node
    const slugifiedProductType = slugify(translatedProductType, { lower: true })
    return `./${slugifiedProductType}/${handle}`
  }
  //define translated products
  const products = result.data.products
  const productNodes = result.data.products.nodes
  const translatedProductNodes = result.data.translatedProducts.nodes
  const translatedProductNodesMerged = productNodes.map((product) => {
    const translatedProduct = translatedProductNodes.filter(
      (tProduct) => tProduct.storefrontId === product.storefrontId
    )[0]
    const productMerged = {
      ...product,
      title: translatedProduct.title,
      id: translatedProduct.id,
      slug: createTranslatedSlug(translatedProduct),
    }
    return productMerged
  })
  const translatedProducts = {
    ...products,
    nodes: translatedProductNodesMerged,
  }

  //create french products page
  createPage({
    path: `/magasin`,
    component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
    context: {
      products: translatedProducts,
      language: "fr",
    },
  })

  //create english products page
  createPage({
    path: `/en/store`,
    component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
    context: {
      products,
      language: "en",
    },
  })

  //create individual french pages
  translatedProducts.nodes.forEach((node) => {})

  // products.forEach((category) => {
  //   const translatedProduct = translatedProducts.filter(
  //     (tProduct) => tProduct.node.storefrontId === category.node.storefrontId
  //   )

  //   translatedCollection.forEach((tCollection) => {
  //     const newCollection = {
  //       ...category,
  //       node: {
  //         ...category.node,
  //         title: tCollection.node.title,
  //         description: tCollection.node.description,
  //         descriptionHtml: tCollection.node.descriptionHtml,
  //         handle: slugify(tCollection.node.title),
  //       },
  //     }

  //     createPage({
  //       path: `/${tCollection.node.locale}/${slugify(tCollection.node.title)}`,
  //       component: path.resolve(`src/fr/pages/products/index.js`), // Update path to the translated products component
  //       context: {
  //         id: newCollection.node.id,
  //         locale: tCollection.node.locale,
  //         title: newCollection.node.title,
  //         storefrontId: newCollection.node.storefrontId,
  //         originalPath: category.node.handle,
  //         isAlreadyTranslated: true,
  //         additionalProperties: {
  //           // Add additional properties from ShopifyProduct
  //         },
  //       },
  //     })
  //   })
  // })

  //   const collections = result.data.collections.edges
  //   const translatedCollections = result.data.translatedCollections.edges

  //   collections.forEach((category) => {
  //     const translatedCollection = translatedCollections.filter(
  //       (tCollection) =>
  //         tCollection.node.storefrontId === category.node.storefrontId
  //     )

  //     translatedCollection.forEach((tCollection) => {
  //       const newCollection = {
  //         ...category,
  //         node: {
  //           ...category.node,
  //           title: tCollection.node.title,
  //           description: tCollection.node.description,
  //           descriptionHtml: tCollection.node.descriptionHtml,
  //           handle: slugify(tCollection.node.title),
  //         },
  //       }

  //         createPage({
  //           path: `/${tCollection.node.locale}/${slugify(tCollection.node.title)}`,
  //           component: path.resolve(`src/fr/pages/products/index.js`), // Update path to the translated products component
  //           context: {
  //             id: newCollection.node.id,
  //             locale: tCollection.node.locale,
  //             title: newCollection.node.title,
  //             storefrontId: newCollection.node.storefrontId,
  //             originalPath: category.node.handle,
  //             isAlreadyTranslated: true,
  //             additionalProperties: {
  //               // Add additional properties from ShopifyProduct
  //             },
  //           },
  //         })
  //     })
  //   })
}
