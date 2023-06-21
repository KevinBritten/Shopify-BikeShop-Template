import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"

function LocalizedGatsbyImage({ image, alten, altfr, language }) {
  return language === "en" ? (
    <GatsbyImage image={image} alt={alten} className="relative w-full h-full" />
  ) : (
    <GatsbyImage image={image} alt={altfr} className="relative w-full h-full" />
  )
}

export default LocalizedGatsbyImage
