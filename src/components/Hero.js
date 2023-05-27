// Hero.js
import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Slide from "./Slide"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { graphql, useStaticQuery } from "gatsby"

import "../styles/splide.css"

const slides = [
  // Your slide data here
  {
    image: "../images/placeholder-img-1.png",
    title: "Bike builds you can trust",
    subtitle: "Contact us now for a custom bike build.",
    target: "/target1",
  },
  {
    image: "../images/placeholder-img-2.png",
    title: "Slide 1 Title",
    subtitle: "Slide 1 Subtitle",
    target: "/target1",
  },
  {
    image: "../images/placeholder-img-3.png",
    title: "Slide 1 Title",
    subtitle: "Slide 1 Subtitle",
    target: "/target1",
  },
  // More slides...
]

const Hero = () => {
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
    <Splide className="h-[80vh]">
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
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-center">
              <h1 className="text-4xl ">{slide.title}</h1>
              <h2 className="text-2xl text-black">{slide.subtitle}</h2>
              <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Click Me
              </button>
            </div>
          </div>
        </SplideSlide>
      ))}
    </Splide>
  )
}

export default Hero
