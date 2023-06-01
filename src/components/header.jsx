import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import { StoreContext } from "../context/store-context"
import Logo from "../icons/logo"
import { Navigation } from "./navigation"
import { CartButton } from "./cart-button"
import SearchIcon from "../icons/search"
import { Toast } from "./toast"
import {
  header,
  container,
  logo as logoCss,
  searchButton,
  languageButton,
  nav,
  activeLink,
} from "./header.module.css"

export function Header({ language }) {
  const { t, i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  function changeLanguage(lang) {
    const currentPath = window.location.pathname

    if (lang === "fr") {
      // Switching to French, replace "/en/" with "/"
      window.location.pathname = currentPath.replace("/en/", "/")
    } else if (lang === "en") {
      // Switching to English, prepend "/en/" to the path
      window.location.pathname = "/en" + currentPath
    }
  }

  const { checkout, loading, didJustAddToCart } = React.useContext(StoreContext)

  const items = checkout ? checkout.lineItems : []

  const quantity = items.reduce((total, item) => {
    return total + item.quantity
  }, 0)

  return (
    <div className={container}>
      <header className={header}>
        <Link to="/" className={logoCss}>
          <Logo />
        </Link>
        <nav className="nav hidden items-center md:flex uppercase">
          <Link to="/#services" activeClassName={activeLink}>
            {t("links.services")}
          </Link>
          <Link to="/#builds" activeClassName={activeLink}>
            {t("links.builds")}
          </Link>
          <Link to="/#contact" activeClassName={activeLink}>
            {t("links.contact")}
          </Link>
          <Link to="/shop" activeClassName={activeLink}>
            {t("links.store")}
          </Link>
        </nav>

        <nav className="md:hidden">
          <button>Menu</button>{" "}
          {/* This could toggle display of a dropdown or slide-out menu */}
        </nav>
        {/* <Navigation className={nav} /> */}
        <div className={languageButton}>
          {language === "fr" && (
            <button onClick={() => changeLanguage("en")}>EN</button>
          )}
          {language === "en" && (
            <button onClick={() => changeLanguage("fr")}>FR</button>
          )}
        </div>
        <Link to="/search" className={searchButton}>
          <SearchIcon />
        </Link>
        <CartButton quantity={quantity} />
      </header>
      <Toast show={loading || didJustAddToCart}>
        {!didJustAddToCart ? (
          "Updating…"
        ) : (
          <>
            Added to cart{" "}
            <svg
              width="14"
              height="14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.019 10.492l-2.322-3.17A.796.796 0 013.91 6.304L6.628 9.14a1.056 1.056 0 11-1.61 1.351z"
                fill="#fff"
              />
              <path
                d="M5.209 10.693a1.11 1.11 0 01-.105-1.6l5.394-5.88a.757.757 0 011.159.973l-4.855 6.332a1.11 1.11 0 01-1.593.175z"
                fill="#fff"
              />
              <path
                d="M5.331 7.806c.272.326.471.543.815.163.345-.38-.108.96-.108.96l-1.123-.363.416-.76z"
                fill="#fff"
              />
            </svg>
          </>
        )}
      </Toast>
    </div>
  )
}
