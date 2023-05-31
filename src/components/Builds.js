import React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"

function Builds() {
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
    <section id="builds" className="p-16">
      <h1 className="text-center">Builds</h1>
      <div className="flex items-center mt-16">
        <div className="w-1/2 flex">
          <div className="flex flex-col w-full p-4">
            <h2 className="text-compliment text-center">Custom Builds</h2>{" "}
            <p className="mt-4">
              Customize Your Ride at Courrier Caverne! Our Custom Builds are
              designed to bring your dream bike to life. With a wide range of
              frame options, components, and accessories to choose from, you
              have the freedom to create a one-of-a-kind masterpiece that
              reflects your unique style and preferences. Our knowledgeable
              staff will assist you every step of the way, providing expert
              advice and guidance to ensure your custom build exceeds your
              expectations. Whether you're a seasoned cyclist or a first-time
              rider, Courrier Caverne is here to help you create the perfect
              bike that matches your vision.
            </p>
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
      <div className="flex items-center mt-16">
        <div className="p-4 relative w-1/2 h-72 ">
          <GatsbyImage
            image={image2}
            alt={"A picture of our workbench"}
            className="relative w-full h-full"
          />
        </div>
        <div className="w-1/2 flex">
          <div className="flex flex-col w-full p-4">
            <h2 className="text-compliment text-center">Complete Builds</h2>{" "}
            <p className="mt-4">
              Discover Convenience and Quality with Complete Builds at Courrier
              Caverne! If you're looking for a ready-to-ride option without the
              hassle, our Complete Builds are the ideal choice. Our curated
              selection of prebuilt bikes ensures high-quality craftsmanship and
              performance, carefully assembled and tuned by our skilled team.
              Whether you're seeking a road bike, mountain bike, or urban
              commuter, our Complete Builds offer a seamless riding experience
              right out of the box. Experience the joy of cycling with
              confidence, knowing that your bike is built to the highest
              standards at Courrier Caverne.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Builds
