const path = require("path")
const slugify = require("@sindresorhus/slugify")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      products: allShopifyProduct(sort: { fields: publishedAt, order: ASC }) {
        nodes {
          ...ProductCard
          createdAt
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
      translatedProducts: allShopifyTranslatedProduct(
        filter: { locale: { eq: "fr" } }
      ) {
        nodes {
          ...TranslatedProductCard
          handle
          storefrontId
          metafields {
            key
            value
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

  function getProductTypeMetafieldFromNode(node) {
    return node.metafields.filter((metafield) => {
      return metafield.key === "product_type"
    })[0].value
  }
  function createTranslatedSlug(node, base) {
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

      //add metafields from original language if no translated version exists
      const metafields = product.metafields.map((metafield) => {
        const translatedMetafield = translatedProduct.metafields.find(
          (tMetafield) => tMetafield.key === metafield.key
        )
        if (translatedMetafield) {
          return translatedMetafield
        } else {
          return metafield
        }
      })

      const productMerged = {
        ...product,
        metafields,
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
    frenchProductTypes.forEach((productType, i) => {
      createPage({
        path: `magasin/${slugify(productType)}`,
        component: path.resolve(`src/components/ProductTypePageTranslated.jsx`),
        context: {
          products: filterProductsByType(translatedProducts, productType),
          language: "fr",
          otherLanguagePage: `/en/store/${slugify(englishProductTypes[i])}`,
          productType,
        },
      })
    })

    //create english page for each product type
    englishProductTypes.forEach((productType, i) => {
      createPage({
        path: `en/store/${slugify(productType)}`,
        component: path.resolve(`src/components/ProductTypePageTranslated.jsx`),
        context: {
          products: filterProductsByType(products, productType),
          language: "en",
          otherLanguagePage: `/magasin/${slugify(frenchProductTypes[i])}`,
          productType,
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
      component: path.resolve(`src/components/ProductPageTranslated.jsx`),
      context: {
        storefrontId: node.storefrontId,
        language: "en",
        otherLanguagePage: node.otherLanguagePage,
      },
    })
  })

  // create search pages
  const searchPageConfig = [
    { products, path: "/en/search", language: "en" },
    { products: translatedProducts, path: "/recherche", language: "fr" },
  ]

  searchPageConfig.forEach((language, i, a) => {
    createPage({
      path: language.path,
      component: path.resolve(`src/components/SearchPageComponent.jsx`),
      context: {
        otherLanguagePage: i === 0 ? a[1].path : a[0].path,
        language: language.language,
        products: language.products,
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
