import * as React from "react"
import { Seo } from "../components/seo"
import CartPageComponent from "../components/CartPageComponent"

export default function CartPage() {
  return <CartPageComponent language="fr" otherLanguagePage="/en/cart" />
}

export const Head = () => <Seo title="Panier - Courrier Caverne" />
