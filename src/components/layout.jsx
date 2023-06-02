import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import Footer from "./Footer"

export function Layout({ children, language }) {
  return (
    <div>
      <SkipNavLink />
      <Header language={language} />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
