import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import LocalizedGatsbyImage from "../components/LocalizedGatsbyImage"

function Builds({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])
  const data = useStaticQuery(graphql`
    query {
      customBuildsImage: file(relativePath: { eq: "iStock-876453532.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
      completeBuildsImage: file(relativePath: { eq: "iStock-155437509.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP, AVIF])
        }
      }
    }
  `)

  const completeBuildsImage = getImage(data.completeBuildsImage)
  const customBuildsImage = getImage(data.customBuildsImage)

  return (
    <section id={t("links.builds")} className="px-4 py-8 lg:p-16">
      <h1 className="text-center">{t("builds.title")}</h1>
      <div className="flex flex-col md:flex-row items-center mt-8 lg:mt-16">
        <div className="md:w-1/2 flex">
          <div className="flex flex-col w-full px-4">
            <h2 className="text-compliment text-center">
              {t("builds.custom.title")}
            </h2>{" "}
            <p className="mt-4">{t("builds.custom.body")}</p>
          </div>
        </div>
        <div className="p-4 relative md:w-1/2 h-72 ">
          <LocalizedGatsbyImage
            image={customBuildsImage}
            alten="An image showing disassembled bicycle components meticulously arranged."
            altfr="Une image montrant des composants de vélo méticuleusement disposés en pièces détachées."
            language={language}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center mt-4 lg:mt-16">
        <div className="p-4 relative md:w-1/2 h-72 ">
          <LocalizedGatsbyImage
            image={completeBuildsImage}
            alten="An image showing a rack full of vintage road bikes."
            altfr="Une image montrant un rack rempli de vélos de route vintage."
            language={language}
          />
        </div>
        <div className="md:w-1/2 flex">
          <div className="flex flex-col w-full px-4">
            <h2 className="text-compliment text-center">
              {t("builds.complete.title")}
            </h2>{" "}
            <p className="mt-4">{t("builds.complete.body")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Builds
