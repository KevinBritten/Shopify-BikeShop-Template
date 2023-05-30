import React from "react"

function ServicesCard({ image, title, services, isLast }) {
  return (
    <div className={!isLast ? "border-compliment border-r" : ""}>
      <div className="grid grid-flow-row auto-rows-min">
        <div className="w-24 h-24 mx-auto">
          <img src={image} alt={title} className="w-20 h-20 mx-auto" />
        </div>
        <h3 className="text-center">{title}</h3>
        <ul className="list-disc list-inside">
          {services.map((service, index) => (
            <li key={index}>{service}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ServicesCard
