import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

function Builds({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])
  const data = useStaticQuery(graphql`
    query {
      placeholderImage3: file(relativePath: { eq: "placeholder-img-3.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
      placeholderImage4: file(relativePath: { eq: "placeholder-img-4.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 400
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const image1 = getImage(data.placeholderImage3)
  const image2 = getImage(data.placeholderImage4)

  return (
    <section id={t("links.builds")} className="px-4 py-8 lg:p-16">
      <h1 className="text-center">{t("builds.title")}</h1>
      <div className="flex items-center mt-8 lg:mt-16">
        <div className="w-1/2 flex">
          <div className="flex flex-col w-full px-4">
            <h2 className="text-compliment text-center">
              {t("builds.custom.title")}
            </h2>{" "}
            <p className="mt-4">{t("builds.custom.body")}</p>
          </div>
        </div>
        <div className="p-4 relative w-1/2 h-72 ">
          <GatsbyImage
            image={image1}
            alt={"A picture of our workbench"}
            className="relative w-full h-full"
          />
        </div>
      </div>
      <div className="flex items-center mt-4 lg:mt-16">
        <div className="p-4 relative w-1/2 h-72 ">
          <GatsbyImage
            image={image2}
            alt={"A picture of our workbench"}
            className="relative w-full h-full"
          />
        </div>
        <div className="w-1/2 flex">
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
