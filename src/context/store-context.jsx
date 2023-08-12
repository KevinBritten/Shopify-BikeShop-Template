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

  const fetchFrenchWebUrl = async (checkoutID) => {
    //   const query = `
    // query MyQuery @inContext(language: FR) {
    //   node(id: "${checkoutID}") {
    //     ... on Checkout {
    //       webUrl
    //     }
    //   }
    // }`

    //   const url = "https://bestteststore2.myshopify.com/api/2023-07/graphql.json"
    //   const headers = {
    //     "X-Shopify-Storefront-Access-Token":
    //       process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
    //   }

    //   try {
    //     const data = await request(url, query, undefined, headers)
    //     const frenchUrl = data.node.webUrl
    //     setFrenchWebUrl(frenchUrl)
    //   } catch (error) {
    //     console.error(error)
    //   }
    return
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

              // await client.checkout.addLineItems(
              //   fetchedCheckout.id,
              //   existingCheckout.lineItems.map((item) => {
              //     return { variantId: item.variant.id, quantity: item.quantity }
              //   })
              // )
              const input = {
                customAttributes: [
                  { key: "language", value: client.config.language },
                ],
              }

              let updatedCheckout = await client.checkout.updateAttributes(
                newCheckout.id,
                input
              )
              updatedCheckout = await client.checkout.addLineItems(
                newCheckout.id,
                existingCheckout.lineItems.map((item) => {
                  return { variantId: item.variant.id, quantity: item.quantity }
                })
              )

              setCheckoutItem(updatedCheckout)
              return
            }
            console.log("no")
            setCheckoutItem(existingCheckout)
            fetchFrenchWebUrl(existingCheckout.id)
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
      fetchFrenchWebUrl(newCheckout.id)
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
