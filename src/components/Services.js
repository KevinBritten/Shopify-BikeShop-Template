import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import ServicesCard from "./ServicesCard"

function Services({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  const serviceLevels = [
    {
      image: "/services-icon-1.svg",
      title: t("services.serviceLevels.0.title"),
      services: t("services.serviceLevels.0.services", { returnObjects: true }),
    },
    {
      image: "/services-icon-2.svg",
      title: t("services.serviceLevels.1.title"),
      services: t("services.serviceLevels.1.services", { returnObjects: true }),
    },
    {
      image: "/services-icon-3.svg",
      title: t("services.serviceLevels.2.title"),
      services: t("services.serviceLevels.2.services", { returnObjects: true }),
    },
  ]
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "placeholder-img-3.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1024
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  `)

  const image = getImage(data.placeholderImage)

  return (
    <section id={t("links.services")}>
      <div className="px-4 py-8 lg:p-16 bg-light-bg">
        <h1 className="text-center">{t("services.title")}</h1>
        <h2 className="text-center mt-8">{t("services.subtitle")}</h2>
        <div className="grid grid-cols-3 gap-4 border-compliment mt-4">
          {serviceLevels.map((level, index) => (
            <ServicesCard
              key={index}
              image={level.image}
              title={level.title}
              services={level.services}
              isLast={index === serviceLevels.length - 1}
            />
          ))}
        </div>
      </div>
      <div className="relative text-center h-96">
        <GatsbyImage
          image={image}
          alt={"A picture of our workbench"}
          className="relative w-full h-full"
        />
        <div className="w-full lg:max-w-3xl absolute top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-between">
          <h2 className=" text-compliment">{t("services.estimate.title")}</h2>
          <p className=" max-w-2xl mt-4">{t("services.estimate.body")}</p>
        </div>
      </div>
    </section>
  )
}

export default Services
