// Slide.js
import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Slide = ({ imageSrc, title, subtitle, targetSection }) => {
  const image = getImage(imageSrc)
  console.log(image, imageSrc)

  return (
    <div className="relative h-full w-full flex items-center justify-center text-center">
      <GatsbyImage
        image={image}
        alt={title}
        className="w-full h-full object-cover absolute"
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center">
        <div className="p-8 bg-white bg-opacity-50 rounded-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-bold mb-4">
            {title}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-black mb-8">
            {subtitle}
          </h2>
          <Link
            to={targetSection}
            className="inline-flex items-center px-6 py-3 text-lg text-black bg-blue-500 hover:bg-blue-600 rounded-full"
          >
            Go to Section
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6 ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Slide
