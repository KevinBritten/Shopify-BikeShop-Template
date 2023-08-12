import * as React from "react"
import fetch from "isomorphic-fetch"
import Client, { CustomerErrorCode } from "shopify-buy"
import { request } from "graphql-request"

let client = Client.buildClient(
  {
    domain: process.env.GATSBY_SHOPIFY_STORE_URL,
    storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    language: "fr",
  },
  fetch
)

const defaultValues = {
  cart: [],
  isOpen: false,
  loading: false,
  loadingCheckout: true,
  onOpen: () => {},
  onClose: () => {},
  addVariantToCart: () => {},
  removeLineItem: () => {},
  updateLineItem: () => {},
  client,
  checkout: {
    lineItems: [],
  },
}

export const StoreContext = React.createContext(defaultValues)

const isBrowser = typeof window !== `undefined`
const localStorageKey = `shopify_checkout_id`

export const StoreProvider = ({ children }) => {
  const [checkout, setCheckout] = React.useState(defaultValues.checkout)
  const [loading, setLoading] = React.useState(false)
  const [loadingCheckout, setLoadingCheckout] = React.useState(true)
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false)
  const [frenchWebUrl, setFrenchWebUrl] = React.useState(null)

  const fetchFrenchTitle = async (id) => {
    const query = `
    query MyQuery($id:ID!) @inContext(language: FR) {
      node(id: $id) {
        ... on ProductVariant {
          product {
            title
          }
        }
      }
    }
    `

    const variables = { id }

    const url = "https://bestteststore2.myshopify.com/api/2023-07/graphql.json"
    const headers = {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    }

    try {
      const data = await request(url, query, variables, headers)
      return data.node.product.title // Adjust this based on the actual response structure
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (window.location.pathname.includes("/en/")) {
      client = Client.buildClient(
        {
          domain: process.env.GATSBY_SHOPIFY_STORE_URL,
          storefrontAccessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
          language: "en",
        },
        fetch
      )
    }
  }, [])

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
    setLoadingCheckout(false)
  }

  React.useEffect(() => {
    const initializeCheckout = async () => {
      const existingCheckoutID = isBrowser
        ? localStorage.getItem(localStorageKey)
        : null

      if (existingCheckoutID && existingCheckoutID !== `null`) {
        try {
          const existingCheckout = await client.checkout.fetch(
            existingCheckoutID
          )
          if (!existingCheckout.completedAt) {
            console.log(
              existingCheckout.customAttributes[0].value,
              client.config.language
            )
            if (
              !(
                existingCheckout.customAttributes[0].value ===
                client.config.language
              )
            ) {
              const newCheckout = await client.checkout.create()

              const input = {
                customAttributes: [
                  { key: "language", value: client.config.language },
                ],
              }

              let updatedCheckout = await client.checkout.updateAttributes(
                newCheckout.id,
                input
              )
              const lineItemsToAdd = existingCheckout.lineItems.map((item) => {
                const customAttributes = [
                  {
                    key: item.customAttributes[0].key,
                    value: item.customAttributes[0].value,
                  },
                ]
                return {
                  variantId: item.variant.id,
                  quantity: item.quantity,
                  customAttributes,
                }
              })

              updatedCheckout = await client.checkout.addLineItems(
                newCheckout.id,
                lineItemsToAdd
              )

              setCheckoutItem(updatedCheckout)
              return
            }
            console.log("no")
            setCheckoutItem(existingCheckout)

            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      const input = {
        customAttributes: [{ key: "language", value: client.config.language }],
      }
      await client.checkout.updateAttributes(newCheckout.id, input)
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = async (variantId, quantity) => {
    setLoading(true)

    const checkoutID = checkout.id

    const frenchTitle = await fetchFrenchTitle(variantId)

    console.log(frenchTitle)

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
        customAttributes: [{ key: "frenchTitle", value: frenchTitle }],
      },
    ]

    return client.checkout
      .addLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
        setDidJustAddToCart(true)
        setTimeout(() => setDidJustAddToCart(false), 3000)
      })
  }

  const removeLineItem = (checkoutID, lineItemID) => {
    setLoading(true)

    return client.checkout
      .removeLineItems(checkoutID, [lineItemID])
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  const updateLineItem = (checkoutID, lineItemID, quantity) => {
    setLoading(true)

    const lineItemsToUpdate = [
      { id: lineItemID, quantity: parseInt(quantity, 10) },
    ]

    return client.checkout
      .updateLineItems(checkoutID, lineItemsToUpdate)
      .then((res) => {
        setCheckout(res)
        setLoading(false)
      })
  }

  return (
    <StoreContext.Provider
      value={{
        ...defaultValues,
        loadingCheckout,
        addVariantToCart,
        removeLineItem,
        updateLineItem,
        checkout,
        loading,
        didJustAddToCart,
        frenchWebUrl,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
