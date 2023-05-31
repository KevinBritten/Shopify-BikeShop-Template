import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql, useStaticQuery } from "gatsby"
import placeholderImg from "../images/placeholder-img-2.png" // Import the image

import ServicesCard from "./ServicesCard"

function Services() {
  const serviceLevels = [
    {
      image: "services-icon-1.svg",
      title: "Basic",
      services: ["Service 1", "Service 2", "Service 3"],
    },
    {
      image: "services-icon-2.svg",
      title: "Comprehensive",
      services: ["Service 1", "Service 2", "Service 3", "Service 4"],
    },
    {
      image: "services-icon-3.svg",
      title: "Deluxe",
      services: [
        "Service 1",
        "Service 2",
        "Service 3",
        "Service 4",
        "Service 5",
      ],
    },
  ]
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "placeholder-img-2.png" }) {
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

  const image = getImage(data.placeholderImage)

  return (
    <section className="bg-light-bg p-16">
      <h1 className="text-center">Services</h1>
      <h2 className="text-center">Tune-Ups</h2>
      <div className="grid grid-cols-3 gap-4 border-compliment">
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
      <div className="relative text-center">
        <GatsbyImage
          image={image}
          alt={"A picture of our workbench"}
          className="realtive w-full h-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-16 py-8 bg-white bg-opacity-90 flex flex-col items-center justify-between">
          <h2 className="text-4xl text-compliment">
            Visit us for a free estimate
          </h2>
          <p className="text-2xl mt-4">
            Get a free estimate at Courrier Caverne today! Our skilled mechanics
            have the knowledge and expertise to fix any bike issue. Trust us
            with your bike's maintenance and repairs, from minor adjustments to
            complex fixes.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Services
