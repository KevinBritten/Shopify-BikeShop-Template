import * as React from "react"
import { Seo } from "../../components/seo"
import CartPageComponent from "../../components/CartPageComponent"

export default function CartPage() {
  return <CartPageComponent language="en" otherLanguagePage="/panier" />
}

export const Head = () => <Seo title="Cart - Courrier Caverne" />
