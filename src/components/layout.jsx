import * as React from "react"
import { SkipNavContent, SkipNavLink } from "./skip-nav"
import { Header } from "./header"
import Footer from "./Footer"

export function Layout({ children, language, otherLanguagePage }) {
  return (
    <div>
      <SkipNavLink />
      <Header language={language} otherLanguagePage={otherLanguagePage} />
      <SkipNavContent>{children}</SkipNavContent>
      <Footer />
    </div>
  )
}
