import React from "react"
import Socials from "./Socials"

function Footer() {
  return (
    <footer className="bg-black px-4 lg:px-16 py-8 flex justify-center md:justify-between items-center text-white">
      <ul className="hidden md:block">
        <li>7411 rue Saint-Hubert</li>
        <li>Montréal, Québec</li>
        <li>H2R 2N4</li>
      </ul>
      <Socials />
      <a
        href="mailto:info@courriercaverne.ca"
        className="underline hidden md:block"
      >
        info@courriercaverne.ca
      </a>
    </footer>
  )
}

export default Footer
