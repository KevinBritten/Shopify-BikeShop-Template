import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        links: {
          services: "services",
          builds: "builds",
          contact: "contact",
          store: "store",
          search: "search",
        },
        hero: {
          slides: [
            {
              title: "Bike builds you can trust",
              subtitle: "Contact us now for a custom bike build.",
            },
            {
              title: "Premium coffee and baked goods",
              subtitle:
                "Enjoy our high-quality beverages and delicious treats.",
            },
            {
              title: "Wide selection of components and accessories",
              subtitle:
                "We carry a wide selection of top-quality bike parts and accessories.",
            },
          ],
        },
        intro: {
          title: "Our Store",
          body: "Welcome to Courrier Caverne, where our love for bikes and coffee collide. As avid cyclists and coffee enthusiasts, we wanted to create a space where people like us can enjoy both passions. At Courrier Caverne, we offer a wide selection of bikes and accessories for all levels of riders. And, when you're ready to refuel, our café serves up tasty baked goods and quality coffee to keep you going.",
        },
        services: {
          title: "Services",
          subtitle: "Tune-Ups",
          serviceLevels: [
            {
              title: "Basic",
              services: [
                "Cleaning the frame.",
                "Inspecting and evaluating the bike.",
                "Adjusting the brakes.",
                "Adjusting the speed.",
                "Lubricating the chain.",
                "Inflating the tires.",
                "Checking the tightness of bolts.",
                "Providing follow-up recommendations.",
              ],
            },
            {
              title: "Comprehensive",
              services: [
                "Including everything from the Basic level, plus",
                "Cleaning the transmission and components.",
              ],
            },
            {
              title: "Deluxe",
              services: [
                "Including everything from the Comprehensive level, plus",
                "Lubricating and adjusting the headset, bottom bracket, and wheel hubs.",
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
        contact: {
          title: "Come Visit Us",
          hours: {
            title: "Open Hours",
            days: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            closed: "Closed",
          },
          location: { title: "Location" },
          contact: { title: "Contact" },
        },
      },
    },
    fr: {
      translation: {
        links: {
          services: "services",
          builds: "constructions",
          contact: "contact",
          store: "magasin",
          search: "recherche",
        },

        hero: {
          slides: [
            {
              title:
                "Constructions de vélos sur lesquelles vous pouvez compter",
              subtitle:
                "Contactez-nous maintenant pour une construction de vélo personnalisée.",
            },
            {
              title: "Café et pâtisseries de qualité supérieure",
              subtitle:
                "Profitez de nos boissons de haute qualité et de délicieuses gourmandises.",
            },
            {
              title: "Large sélection de composants et d'accessoires",
              subtitle:
                "Nous proposons une large sélection de pièces de vélo et d'accessoires de qualité supérieure.",
            },
          ],
        },
        intro: {
          title: "Notre Magasin",
          body: "Bienvenue chez Courrier Caverne, là où notre amour pour les vélos et le café se rencontrent. En tant que cyclistes passionnés et amateurs de café, nous voulions créer un espace où des personnes comme nous peuvent profiter de ces deux passions. Chez Courrier Caverne, nous proposons une large sélection de vélos et d'accessoires pour tous les niveaux de cyclistes. Et lorsque vous avez besoin de faire le plein, notre café vous offre de délicieuses pâtisseries et du café de qualité pour vous maintenir en forme.",
        },
        services: {
          title: "Services",
          subtitle: "Révisions",
          serviceLevels: [
            {
              title: "Basique",
              services: [
                "Nettoyage du cadre.",
                "Inspection et évaluation du vélo.",
                "Ajustement des freins.",
                "Ajustement des derailleurs.",
                "Lubrification de la chaîne.",
                "Gonflage des pneus.",
                "Vérification du serrage des boulons.",
                "Recommandations de suivi.",
              ],
            },
            {
              title: "Complet",
              services: [
                "Incluant l’ensemble des services du forfait basique, plus",
                "Nettoyage de la transmission et des composants.",
              ],
            },
            {
              title: "De luxe",
              services: [
                "Incluant l’ensemble des services du forfait complet, plus",
                "Lubrification et ajustement du jeu de direction, du boîtier de pédalier et des moyeux de roues.",
              ],
            },
          ],

          estimate: {
            title: "Venez-nous rendre visite pour un devis gratuit",
            body: "Obtenez un devis gratuit à Courrier Caverne aujourd'hui! Nos mécaniciens qualifiés ont les connaissances et l'expertise pour résoudre n'importe quel problème de vélo. Confiez-nous l'entretien et les réparations de votre vélo, des réglages mineurs aux réparations complexes.",
          },
        },
        builds: {
          title: "Montages",
          custom: {
            title: "Montages Sur Mesure",
            body: "Personnalisez votre vélo à Courrier Caverne! Nos Montages Sur Mesure sont conçus pour réaliser le vélo de vos rêves. Avec une large gamme d'options de cadre, de composants et d'accessoires au choix, vous avez la liberté de créer un chef-d'œuvre unique qui reflète votre style et vos préférences uniques. Notre personnel compétent vous assistera à chaque étape, fournissant des conseils et des orientations experts pour garantir que votre montage sur mesure dépasse vos attentes. Que vous soyez un cycliste expérimenté ou un novice, Courrier Caverne est là pour vous aider à créer le vélo parfait qui correspond à votre vision.",
          },
          complete: {
            title: "Montages Complets",
            body: "Découvrez la commodité et la qualité des Montages Complets à Courrier Caverne! Si vous recherchez une option prête à rouler sans tracas, nos Montages Complets sont le choix idéal. Notre sélection soigneusement choisie de vélos préassemblés assure un savoir-faire et des performances de haute qualité, soigneusement assemblés et réglés par notre équipe compétente. Que vous cherchiez un vélo de route, un VTT ou un vélo urbain, nos Montages Complets offrent une expérience de conduite fluide dès la sortie de la boîte. Vivez la joie du cyclisme en toute confiance, sachant que votre vélo est construit aux normes les plus élevées à Courrier Caverne.",
          },
        },
        contact: {
          title: "Venez Nous Visiter",
          hours: {
            title: "Heures d'ouverture",
            days: [
              "Lundi",
              "Mardi",
              "Mercredi",
              "Jeudi",
              "Vendredi",
              "Samedi",
              "Dimanche",
            ],
            closed: "Fermée",
          },
          location: { title: "Lieu" },
          contact: { title: "Contact" },
        },
      },
    },
  },
  lng: "fr", // language to use, more information below
  interpolation: {
    escapeValue: false, // react is already safe from xss
  },
})

export default i18n
