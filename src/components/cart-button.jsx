import * as React from "react"
import { Link } from "gatsby"
import CartIcon from "../icons/cart"
import { cartButton, badge } from "./cart-button.module.css"

export function CartButton({ quantity, language }) {
  return (
    <Link
      aria-label={
        language === "en"
          ? `Shopping Cart with ${quantity} items`
          : `Panier avec ${quantity} article`
      }
      to={language === "en" ? "/en/cart" : "/panier"}
      className={cartButton}
    >
      <CartIcon />
      {quantity > 0 && <div className={badge}>{quantity}</div>}
    </Link>
  )
}
