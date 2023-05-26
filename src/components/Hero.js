// Hero.js
import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import Slide from "./Slide"

const slides = [
  // Your slide data here
  {
    image: "../images/placeholder-img-1.png",
    title: "Slide 1 Title",
    subtitle: "Slide 1 Subtitle",
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

const Hero = () => (
  <Splide
    options={{
      type: "loop",
      gap: "1rem",
      pagination: true,
      autoplay: true,
      pauseOnHover: false,
      resetProgress: false,
    }}
  >
    {slides.map((slide, index) => (
      <SplideSlide key={index}>
        <Slide
          imageSrc={slide.image}
          title={slide.title}
          subtitle={slide.subtitle}
          targetSection={slide.target}
        />
      </SplideSlide>
    ))}
  </Splide>
)

export default Hero
