import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import ServicesCard from "./ServicesCard"
import GatsbyImageWithLocalization from "./GatsbyImageWithLocalization"

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
      servicesImage: file(relativePath: { eq: "iStock-155436930.jpeg" }) {
        childImageSharp {
          gatsbyImageData(
            width: 2048
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
    }
  `)

  const image = getImage(data.servicesImage)

  return (
    <section id={t("links.services")}>
      <div className="px-4 py-8 lg:p-16 bg-light-bg">
        <h1 className="text-center">{t("services.title")}</h1>
        <h2 className="text-center mt-8">{t("services.subtitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4  mt-4">
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
        <GatsbyImageWithLocalization
          image={image}
          alten={"An image of a stripped-down bike being repaired on a stand."}
          altfr={
            "Une image d'un vélo démonté qui est en cours de réparation sur un support."
          }
          language={language}
          className="relative w-full h-full"
        />
        <div className="lg:w-full lg:max-w-3xl absolute top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 px-4 md:px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-between">
          <h2 className=" text-compliment">{t("services.estimate.title")}</h2>
          <p className=" max-w-2xl mt-4">{t("services.estimate.body")}</p>
        </div>
      </div>
    </section>
  )
}

export default Services
