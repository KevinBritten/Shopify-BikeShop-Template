// Hero.js
import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Slide from "./Slide"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { graphql, useStaticQuery } from "gatsby"

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
      image: "../images/placeholder-img-1.png",
      title: t("hero.slides.0.title"),
      subtitle: t("hero.slides.0.subtitle"),
      target: "/#contact",
    },
    {
      image: "../images/placeholder-img-2.png",
      title: t("hero.slides.1.title"),
      subtitle: t("hero.slides.1.subtitle"),
      target: "/#builds",
    },
    {
      image: "../images/placeholder-img-3.png",
      title: t("hero.slides.2.title"),
      subtitle: t("hero.slides.2.subtitle"),
      target: "/#service",
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
              <GatsbyImage
                image={slide.image}
                alt={`Slide ${index + 1}`}
                className="realtive w-full h-full"
              />
            )}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-between">
              <h1 className="text-4xl text-center">{slide.title}</h1>
              <h2 className="text-2xl text-black mt-4 text-center">
                {slide.subtitle}
              </h2>
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
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Hero
