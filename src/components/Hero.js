// Hero.js
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Splide, SplideSlide } from "@splidejs/react-splide"

import { getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

import GatsbyImageWithLocalization from "./GatsbyImageWithLocalization"

import "../styles/splide.css"

const splideOptions = {
  lazyLoad: "nearby",
  preloadPages: 1,
  type: "loop", // enables wraparound
  autoplay: true, // enables autoplay
  interval: 5000, // interval of autoplay in milliseconds
  pauseOnHover: false, // whether to pause on hover
  pauseOnFocus: true, // whether to pause on focus
  keyboard: true,
}

const Hero = ({ language }) => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])
  const slides = [
    // Your slide data here

    {
      image: "../images/iStock-1143317984.jpeg",
      title: t("hero.slides.0.title"),
      subtitle: t("hero.slides.0.subtitle"),
      target: `#${t("links.contact")}`,
      altEn:
        "An image of a mechanic working on a bicycle's fork in a clean, organized workshop.",
      altFr:
        "Une image d'un mécanicien travaillant sur la fourche d'un vélo dans un atelier propre et organisé.",
    },
    {
      image: "../images/iStock-1142568317.jpeg",
      title: t("hero.slides.1.title"),
      subtitle: t("hero.slides.1.subtitle"),
      target: `#${t("links.builds")}`,
      altEn: "An image of coffee being poured from a stainless steel machine.",
      altFr:
        "Une image du café qui est versé d'une machine en acier inoxydable.",
    },
    {
      image: "../images/iStock-908850278.jpeg",
      title: t("hero.slides.2.title"),
      subtitle: t("hero.slides.2.subtitle"),
      target: `#${t("links.services")}`,
      altEn: "An image of an orderly rack displaying vintage bike parts.",
      altFr:
        "Une image d'un présentoir ordonné affichant des pièces de vélo vintage.",
    },
  ]
  const data = useStaticQuery(graphql`
    query {
      allFile {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const slidesWithImages = slides.map((slide) => {
    const slideImageName = slide.image
      .split("/")
      .pop()
      .split(".")
      .slice(0, -1)
      .join(".")
    const imageNode = data.allFile.nodes.find(
      (node) => node.name === slideImageName
    )
    const image = imageNode ? getImage(imageNode) : null
    return { ...slide, image }
  })

  return (
    <Splide options={splideOptions} className="h-[80vh]">
      {slidesWithImages.map((slide, index) => (
        <SplideSlide key={index} className="realtive w-full h-full">
          <div className="relative h-full">
            {slide.image && (
              <GatsbyImageWithLocalization
                image={slide.image}
                alten={slide.altEn}
                altfr={slide.altFr}
                language={language}
                className="realtive w-full h-full"
                loading={index === 0 ? "eager" : "lazy"}
              />
            )}
            <div className="w-full lg:max-w-3xl absolute top-1/2 lg:left-1/2 transform lg:-translate-x-1/2 -translate-y-1/2 px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-between">
              <h1 className="text-center block">{slide.title}</h1>
              <h2 className="text-black mt-4 text-center">{slide.subtitle}</h2>
              {/* <a href={slide.target}>
                <button
                  className="mt-4 px-6 py-2 bg-blue-500 rounded-lg flex items-center justify-center"
                  aria-label="Click to navigate"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-8 w-8 stroke-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </a> */}
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Hero
