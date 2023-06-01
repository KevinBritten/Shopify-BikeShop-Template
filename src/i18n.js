import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hero: {
          slides: [
            {
              title: "Bike builds you can trust",
              subtitle: "Contact us now for a custom bike build.",
            },
            {
              title: "Quality Components, Expert Assemblage",
              subtitle:
                "Our experienced staff will help you choose the perfect components for your build.",
            },
            {
              title: "Ready for Any Terrain",
              subtitle:
                "From city commuting to mountain biking, we'll set you up with a bike that's fit for purpose.",
            },
          ],
        },
        intro: {
          title: "Our Store",
          body: "Welcome to Courrier Caverne, where our love for bikes and coffee collide. As avid cyclists and coffee enthusiasts, we wanted to create a space where people like us can enjoy both passions. At Courrier Caverne, we offer a wide selection of bikes and accessories for all levels of riders. And, when you're ready to refuel, our café serves up tasty sandwiches and quality coffee to keep you going.",
        },
        services: {
          title: "Services",
          subtitle: "Tune-Ups",
          serviceLevels: [
            {
              title: "Basic",
              services: ["Service 1", "Service 2", "Service 3"],
            },
            {
              title: "Comprehensive",
              services: ["Service 1", "Service 2", "Service 3", "Service 4"],
            },
            {
              title: "Deluxe",
              services: [
                "Service 1",
                "Service 2",
                "Service 3",
                "Service 4",
                "Service 5",
              ],
            },
          ],
          estimate: {
            title: "Visit us for a free estimate",
            body: "Get a free estimate at Courrier Caverne today! Our skilled mechanics have the knowledge and expertise to fix any bike issue. Trust us with your bike's maintenance and repairs, from minor adjustments to complex fixes.",
          },
        },
        builds: {
          title: "Builds",
          custom: {
            title: "Custom Builds",
            body: "Customize Your Ride at Courrier Caverne! Our Custom Builds are designed to bring your dream bike to life. With a wide range of frame options, components, and accessories to choose from, you have the freedom to create a one-of-a-kind masterpiece that reflects your unique style and preferences. Our knowledgeable staff will assist you every step of the way, providing expert advice and guidance to ensure your custom build exceeds your expectations. Whether you're a seasoned cyclist or a first-time rider, Courrier Caverne is here to help you create the perfect bike that matches your vision.",
          },
          complete: {
            title: "Complete Builds",
            body: "Discover Convenience and Quality with Complete Builds at Courrier Caverne! If you're looking for a ready-to-ride option without the hassle, our Complete Builds are the ideal choice. Our curated selection of prebuilt bikes ensures high-quality craftsmanship and performance, carefully assembled and tuned by our skilled team. Whether you're seeking a road bike, mountain bike, or urban commuter, our Complete Builds offer a seamless riding experience right out of the box. Experience the joy of cycling with confidence, knowing that your bike is built to the highest standards at Courrier Caverne.",
          },
        },
        contact: {},
      },
    },
    fr: {
      translation: {
        hero: { slides: [{ title: "Bike builds you can trust" }] },

        intro: {
          title: "Notre Magasin",
          body: "Bienvenue à Courrier Caverne, où notre amour pour les vélos et le café se rencontrent. En tant que cyclistes passionnés et amateurs de café, nous avons voulu créer un espace où des gens comme nous peuvent profiter de ces deux passions. Chez Courrier Caverne, nous offrons une large sélection de vélos et d'accessoires pour tous les niveaux de cyclistes. Et, lorsque vous êtes prêt à vous ressourcer, notre café propose de délicieux sandwiches et du café de qualité pour vous remettre en route.",
        },
      },
    },
  },
  lng: "en", // language to use, more information below
  interpolation: {
    escapeValue: false, // react is already safe from xss
  },
})

export default i18n
