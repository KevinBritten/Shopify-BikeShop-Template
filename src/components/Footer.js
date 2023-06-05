import React from "react"
import Socials from "./Socials"

function Footer() {
  return (
    <footer className="bg-black px-4 lg:px-16 py-8 flex justify-center md:justify-between items-center text-white">
      <ul className="hidden md:block">
        <li>7400 rue Saint-André</li>
        <li>Montréal, Québec</li>
        <li>H2R 2P7</li>
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
