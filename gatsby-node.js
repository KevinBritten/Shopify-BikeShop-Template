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
          handle
          storefrontId
          metafields {
            key
            value
          }
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
  const products = result.data.products

  //format products to match transtatedProducts

  products.nodes.forEach((node) => {
    const formattedMetafields = node.metafields.map((metafield) => {
      return { node: { ...metafield } }
    })
    node.metafields = { edges: formattedMetafields }
  })

  function getProductTypeMetafieldFromNode(node) {
    return node.metafields.edges.filter((edge) => {
      return edge.node.key === "product_type"
    })[0].node.value
  }
  function createTranslatedSlug(node, base) {
    console.log(node)
    const translatedProductType = getProductTypeMetafieldFromNode(node)
    const { handle } = node
    const slugifiedProductType = slugify(translatedProductType, { lower: true })
    return `/${base}/${slugifiedProductType}/${handle}`
  }
  function getTranslatedProducts() {
    //define translated products
    const productNodes = products.nodes
    const translatedProductNodes = result.data.translatedProducts.nodes
    const translatedProductNodesMerged = productNodes.map((product) => {
      const translatedProduct = translatedProductNodes.filter(
        (tProduct) => tProduct.storefrontId === product.storefrontId
      )[0]

      //add url of equivilant page in other language for switching between languages in header.
      function createOtherLanguageUrl(base, product) {
        return `/${base}/${slugify(getProductTypeMetafieldFromNode(product))}/${
          product.handle
        }
        `
      }
      const englishLanguagePageUrl = createOtherLanguageUrl("en/store", product)
      const frenchLanguagePageUrl = createOtherLanguageUrl(
        "magasin",
        translatedProduct
      )

      const productMerged = {
        ...product,
        metafields: translatedProduct.metafields,
        title: translatedProduct.title,
        id: translatedProduct.id,
        slug: createTranslatedSlug(translatedProduct, "magasin"),
        handle: translatedProduct.handle,
        otherLanguagePage: englishLanguagePageUrl,
      }
      //set the nescessary properties on the original product
      product.otherLanguagePage = frenchLanguagePageUrl
      product.slug = createTranslatedSlug(product, "en/store")
      return productMerged
    })
    return {
      ...products,
      nodes: translatedProductNodesMerged,
    }
  }
  function getUniqueProductTypes(nodes) {
    const productTypes = nodes.map(getProductTypeMetafieldFromNode)
    const uniqueProductTypes = [...new Set(productTypes)]
    return uniqueProductTypes
  }
  function buildProductTypePreviews(products) {
    const nodes = products.nodes
    const productTypes = getUniqueProductTypes(nodes)
    const firstProductOfEachType = productTypes.map((type) => {
      const firstProductOfType = nodes.filter(
        (node) => getProductTypeMetafieldFromNode(node) === type
      )[0]

      return {
        ...firstProductOfType,
        title: type,
        slug: `./${slugify(type)}`,
        vendor: "",
        priceRangeV2: false,
      }
    })
    return { ...products, nodes: firstProductOfEachType }
  }

  function filterProductsByType(products, type) {
    const nodes = products.nodes
    const filteredProducts = nodes.filter(
      (node) => getProductTypeMetafieldFromNode(node) === type
    )
    return { ...products, nodes: filteredProducts }
  }

  const translatedProducts = getTranslatedProducts()

  //create french products page
  createPage({
    path: `/magasin`,
    component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
    context: {
      products: buildProductTypePreviews(translatedProducts),
      language: "fr",
      otherLanguagePage: "/en/store/",
      pageTitle: "Magasin",
    },
  })

  //create english products page
  createPage({
    path: `/en/store`,
    component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
    context: {
      products: buildProductTypePreviews(products),
      language: "en",
      otherLanguagePage: "/magasin/",
      pageTitle: "Store",
    },
  })
  function createProductTypePages() {
    //define product types in each language
    const frenchProductTypes = getUniqueProductTypes(translatedProducts.nodes)
    const englishProductTypes = getUniqueProductTypes(products.nodes)

    //create french page for each product type
    frenchProductTypes.forEach((type, i) => {
      createPage({
        path: `magasin/${slugify(type)}`,
        component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
        context: {
          products: filterProductsByType(translatedProducts, type),
          language: "fr",
          otherLanguagePage: `/en/store/${slugify(englishProductTypes[i])}`,
          pageTitle: type,
        },
      })
    })

    //create english page for each product type
    englishProductTypes.forEach((type, i) => {
      createPage({
        path: `en/store/${slugify(type)}`,
        component: path.resolve(`src/components/ProductsPageTranslated.jsx`), // Update path to the translated products component
        context: {
          products: filterProductsByType(products, type),
          language: "en",
          otherLanguagePage: `/magasin/${slugify(frenchProductTypes[i])}`,
          pageTitle: type,
        },
      })
    })
  }

  createProductTypePages()

  // create individual french pages
  translatedProducts.nodes.forEach((node) => {
    createPage({
      path: `/magasin/${slugify(getProductTypeMetafieldFromNode(node))}/${
        node.handle
      }`,
      component: path.resolve(`src/components/ProductPageTranslated.jsx`), // Update path to the translated products component
      context: {
        storefrontId: node.storefrontId,
        language: "fr",
        otherLanguagePage: node.otherLanguagePage,
      },
    })
  })

  // create individual english pages
  products.nodes.forEach((node) => {
    createPage({
      path: `/en/store/${slugify(getProductTypeMetafieldFromNode(node))}/${
        node.handle
      }`,
      component: path.resolve(`src/components/ProductPageTranslated.jsx`), // Update path to the translated products component
      context: {
        storefrontId: node.storefrontId,
        language: "en",
        otherLanguagePage: node.otherLanguagePage,
      },
    })
  })

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
