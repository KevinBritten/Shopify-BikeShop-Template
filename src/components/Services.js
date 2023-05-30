import React from "react"

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
    </section>
  )
}

export default Services
