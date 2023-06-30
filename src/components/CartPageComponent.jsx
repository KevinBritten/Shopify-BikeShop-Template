import * as React from "react"
import { Link } from "gatsby"
import { Layout } from "./layout"
import { StoreContext } from "../context/store-context"
import { LineItem } from "./line-item"
import { formatPrice } from "../utils/format-price"
import {
  table,
  wrap,
  totals,
  grandTotal,
  summary,
  checkoutButton,
  collapseColumn,
  labelColumn,
  imageHeader,
  productHeader,
  emptyStateContainer,
  emptyStateHeading,
  emptyStateLink,
  title,
} from "./cart.module.css"

export default function CartPageComponent({ language, otherLanguagePage }) {
  const { checkout, loading } = React.useContext(StoreContext)
  const emptyCart = checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }

  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <div className={wrap}>
        {emptyCart ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>
              {language === "en"
                ? "Your cart is empty"
                : "Votre panier est vide"}
            </h1>
            {language === "en" ? (
              <Link to="/en/store/" className={emptyStateLink}>
                Go shop
              </Link>
            ) : (
              <Link to="/magasin" className={emptyStateLink}>
                Aller faire des achats
              </Link>
            )}
          </div>
        ) : (
          <>
            <table className={table}>
              {language === "en" ? (
                <thead>
                  <tr>
                    <th className={imageHeader}>Image</th>
                    <th className={productHeader}>Product</th>
                    <th className={collapseColumn}>Price</th>
                    <th>Qty.</th>
                    <th className={[totals, collapseColumn].join(" ")}>
                      Total
                    </th>
                  </tr>
                </thead>
              ) : (
                // French version of the <thead> component
                <thead>
                  <tr>
                    <th className={imageHeader}>Image</th>
                    <th className={productHeader}>Produit</th>
                    <th className={collapseColumn}>Prix</th>
                    <th>Qté.</th>
                    <th className={[totals, collapseColumn].join(" ")}>
                      Total
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} />
                ))}

                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Subtotal</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.subtotalPriceV2.currencyCode,
                      checkout.subtotalPriceV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Taxes</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalTaxV2.currencyCode,
                      checkout.totalTaxV2.amount
                    )}
                  </td>
                </tr>
                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Shipping</td>
                  <td className={totals}>Calculated at checkout</td>
                </tr>
                <tr className={grandTotal}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>Total Price</td>
                  <td className={totals}>
                    {formatPrice(
                      checkout.totalPriceV2.currencyCode,
                      checkout.totalPriceV2.amount
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className={checkoutButton}
            >
              Checkout
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}
