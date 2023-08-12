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
  const { checkout, loading, loadingCheckout } = React.useContext(StoreContext)
  const emptyCart = !loadingCheckout && checkout.lineItems.length === 0

  const handleCheckout = () => {
    window.open(checkout.webUrl)
  }
  React.useEffect(() => {
    console.log(checkout)
  }, [checkout.customAttributes])

  return (
    <Layout language={language} otherLanguagePage={otherLanguagePage}>
      <div className={wrap}>
        <button
          onClick={() => {
            console.log(checkout)
          }}
        >
          checkout
        </button>

        {loadingCheckout ? (
          <div className={emptyStateContainer}>
            <h1 className={emptyStateHeading}>
              {language === "en"
                ? "Loading Cart..."
                : "Chargement du panier..."}
            </h1>
          </div>
        ) : emptyCart ? (
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
                    <th className={collapseColumn}>Qty.</th>
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
                    <th className={collapseColumn}>Qté.</th>
                    <th className={[totals, collapseColumn].join(" ")}>
                      Total
                    </th>
                  </tr>
                </thead>
              )}
              <tbody>
                {checkout.lineItems.map((item) => (
                  <LineItem item={item} key={item.id} language={language} />
                ))}

                <tr className={summary}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>
                    {language === "en" ? "Subtotal" : "Sous-total"}
                  </td>
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
                  <td className={labelColumn}>
                    {language === "en" ? "Taxes" : "Taxes"}
                  </td>
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
                  <td className={labelColumn}>
                    {language === "en" ? "Shipping" : "Livraison"}
                  </td>
                  <td className={totals}>
                    {language === "en"
                      ? "Calculated at checkout"
                      : "Calculé lors du paiement"}
                  </td>
                </tr>
                <tr className={grandTotal}>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={collapseColumn}></td>
                  <td className={labelColumn}>
                    {language === "en" ? "Total Price" : "Prix total"}
                  </td>
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
              {language === "en" ? "Checkout" : "Payer"}
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}
