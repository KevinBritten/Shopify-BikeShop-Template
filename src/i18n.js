import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        hero: {
          slides: {
            slide1: {
              title: "Bike builds you can trust",
              subtitle: "Contact us now for a custom bike build.",
            },
            slide2: {
              title: "Quality Components, Expert Assemblage",
              subtitle:
                "Our experienced staff will help you choose the perfect components for your build.",
            },
            slide3: {
              title: "Ready for Any Terrain",
              subtitle:
                "From city commuting to mountain biking, we'll set you up with a bike that's fit for purpose.",
            },
          },
        },
        intro: {
          title: "Our Store",
          body: "Welcome to Courrier Caverne, where our love for bikes and coffee collide. As avid cyclists and coffee enthusiasts, we wanted to create a space where people like us can enjoy both passions. At Courrier Caverne, we offer a wide selection of bikes and accessories for all levels of riders. And, when you're ready to refuel, our café serves up tasty sandwiches and quality coffee to keep you going.",
        },
        services: {},
        builds: {},
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
