import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import Footer from "./Footer"

export function Layout({ children }) {
  return (
    <div>
      <SkipNavLink />
      <Header />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
