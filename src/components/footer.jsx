import * as React from "react"
import Logo from "../icons/logo"
import {
  footerStyle,
  copyright,
  links,
  blurb,
  logos,
  footerNavList,
  footerNavListItem,
} from "./footer.module.css"

export function Footer() {
  return (
    <footer className={footerStyle}>
      <div className={blurb}>
        <div className={logos}>
          <div style={{ width: 150 }}>
            <Logo />
          </div>
        </div>
      </div>
      <div className={copyright}>
        {/* Copyright &copy; Courrier Caverne {new Date().getFullYear()} · All
        rights reserved */}
        <div className="mb-4">
          7400 rue Saint-André
          <br />
          Montréal, Québec
          <br />
          H2R 2P7
        </div>
        <a
          className="underline hover:no-underline my-8"
          href="mailto:courriercaverne@gmail.com"
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
          courriercaverne@gmail.com
        </a>
      </div>
    </footer>
  )
}
