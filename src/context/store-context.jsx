import * as React from "react"
import fetch from "isomorphic-fetch"
import Client from "shopify-buy"
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
  const [didJustAddToCart, setDidJustAddToCart] = React.useState(false)
  const [frenchWebUrl, setFrenchWebUrl] = React.useState(null)

  const fetchFrenchWebUrl = async (checkoutID) => {
    const query = `
  query MyQuery @inContext(language: FR) {
    node(id: "${checkoutID}") {
      ... on Checkout {
        webUrl
      }
    }
  }`

    const url = "https://bestteststore2.myshopify.com/api/2023-07/graphql.json"
    const headers = {
      "X-Shopify-Storefront-Access-Token":
        process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    }

    try {
      const data = await request(url, query, undefined, headers)
      const frenchUrl = data.node.webUrl
      setFrenchWebUrl(frenchUrl)
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
  console.log(client)

  const setCheckoutItem = (checkout) => {
    if (isBrowser) {
      localStorage.setItem(localStorageKey, checkout.id)
    }

    setCheckout(checkout)
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
            fetchFrenchWebUrl(existingCheckout.id)
            setCheckoutItem(existingCheckout)
            return
          }
        } catch (e) {
          localStorage.setItem(localStorageKey, null)
        }
      }

      const newCheckout = await client.checkout.create()
      fetchFrenchWebUrl(newCheckout.id)
      setCheckoutItem(newCheckout)
    }

    initializeCheckout()
  }, [])

  const addVariantToCart = (variantId, quantity) => {
    setLoading(true)

    const checkoutID = checkout.id

    const lineItemsToUpdate = [
      {
        variantId,
        quantity: parseInt(quantity, 10),
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
