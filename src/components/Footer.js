import React from "react"
import Socials from "./Socials"

function Footer() {
  return (
    <footer className="bg-black px-4 lg:px-16 py-8 flex justify-center md:justify-between items-center text-white">
      <ul className="hidden md:block">
        <li>1337 Rue Barré</li>
        <li>Montréal, Québec</li>
        <li>H3C 1N3</li>
      </ul>
      <Socials />
      <div>
        <a
          href="mailto:info@cyclesanctuary.ca"
          className="underline hidden md:block"
        >
          info@cyclesanctuary.ca
        </a>
        <a href="cafe@cyclesanctuary.ca" className="underline">
          cafe@cyclesanctuary.ca{" "}
        </a>
      </div>
    </footer>
  )
}

export default Footer
