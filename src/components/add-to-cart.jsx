import * as React from "react"
import { StoreContext } from "../context/store-context"
import { addToCart as addToCartStyle } from "./add-to-cart.module.css"

export function AddToCart({
  variantId,
  quantity,
  available,
  language,
  ...props
}) {
  const { addVariantToCart, loading } = React.useContext(StoreContext)

  function addToCart(e) {
    e.preventDefault()
    addVariantToCart(variantId, quantity)
  }

  const messages =
    language === "en"
      ? { addToCart: "Add to Cart", outOfStock: "Out of Stock" }
      : { addToCart: "Ajouter au Panier", outOfStock: "En Rupture de Stock" }

  return (
    <button
      type="submit"
      className={addToCartStyle}
      onClick={addToCart}
      disabled={!available || loading}
      {...props}
    >
      {available ? messages.addToCart : messages.outOfStock}
    </button>
  )
}
