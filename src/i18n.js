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
          body: "Welcome to Cycle Sanctuary, where our love for bikes and coffee collide. As avid cyclists and coffee enthusiasts, we wanted to create a space where people like us can enjoy both passions. At Cycle Sanctuary, we offer a wide selection of bikes and accessories for all levels of riders. And, when you're ready to refuel, our café serves up tasty baked goods and quality coffee to keep you going.",
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
            body: "Get a free estimate at Cycle Sanctuary today! Our skilled mechanics have the knowledge and expertise to fix any bike issue. Trust us with your bike's maintenance and repairs, from minor adjustments to complex fixes.",
          },
        },
        builds: {
          title: "Builds",
          custom: {
            title: "Custom Builds",
            body: "Customize Your Ride at Cycle Sanctuary! Our Custom Builds are designed to bring your dream bike to life. With a wide range of frame options, components, and accessories to choose from, you have the freedom to create a one-of-a-kind masterpiece that reflects your unique style and preferences. Our knowledgeable staff will assist you every step of the way, providing expert advice and guidance to ensure your custom build exceeds your expectations. Whether you're a seasoned cyclist or a first-time rider, Cycle Sanctuary is here to help you create the perfect bike that matches your vision.",
          },
          complete: {
            title: "Complete Builds",
            body: "Discover Convenience and Quality with Complete Builds at Cycle Sanctuary! If you're looking for a ready-to-ride option without the hassle, our Complete Builds are the ideal choice. Our curated selection of prebuilt bikes ensures high-quality craftsmanship and performance, carefully assembled and tuned by our skilled team. Whether you're seeking a road bike, mountain bike, or urban commuter, our Complete Builds offer a seamless riding experience right out of the box. Experience the joy of cycling with confidence, knowing that your bike is built to the highest standards at Cycle Sanctuary.",
          },
        },
        contact: {
          title: "Come Visit Us",
          hours: {
            title: "Open Hours",
            subtitle: {
              bike: "Bike Shop",
              cafe: "Café",
            },
            days: {
              monday: "Monday",
              tuesday: "Tuesday",
              wednesday: "Wednesday",
              thursday: "Thursday",
              friday: "Friday",
              saturday: "Saturday",
              sunday: "Sunday",
            },
            bike: "10am - 6pm",
            cafe: { week: "8am - 5pm", weekend: "9am - 5pm" },
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
          body: "Bienvenue chez Cycle Sanctuary, là où notre amour pour les vélos et le café se rencontrent. En tant que cyclistes passionnés et amateurs de café, nous voulions créer un espace où des personnes comme nous peuvent profiter de ces deux passions. Chez Cycle Sanctuary, nous proposons une large sélection de vélos et d'accessoires pour tous les niveaux de cyclistes. Et lorsque vous avez besoin de faire le plein, notre café vous offre de délicieuses pâtisseries et du café de qualité pour vous maintenir en forme.",
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
            body: "Obtenez un devis gratuit à Cycle Sanctuary aujourd'hui! Nos mécaniciens qualifiés ont les connaissances et l'expertise pour résoudre n'importe quel problème de vélo. Confiez-nous l'entretien et les réparations de votre vélo, des réglages mineurs aux réparations complexes.",
          },
        },
        builds: {
          title: "Montages",
          custom: {
            title: "Montages Sur Mesure",
            body: "Personnalisez votre vélo à Cycle Sanctuary! Nos Montages Sur Mesure sont conçus pour réaliser le vélo de vos rêves. Avec une large gamme d'options de cadre, de composants et d'accessoires au choix, vous avez la liberté de créer un chef-d'œuvre unique qui reflète votre style et vos préférences uniques. Notre personnel compétent vous assistera à chaque étape, fournissant des conseils et des orientations experts pour garantir que votre montage sur mesure dépasse vos attentes. Que vous soyez un cycliste expérimenté ou un novice, Cycle Sanctuary est là pour vous aider à créer le vélo parfait qui correspond à votre vision.",
          },
          complete: {
            title: "Montages Complets",
            body: "Découvrez la commodité et la qualité des Montages Complets à Cycle Sanctuary! Si vous recherchez une option prête à rouler sans tracas, nos Montages Complets sont le choix idéal. Notre sélection soigneusement choisie de vélos préassemblés assure un savoir-faire et des performances de haute qualité, soigneusement assemblés et réglés par notre équipe compétente. Que vous cherchiez un vélo de route, un VTT ou un vélo urbain, nos Montages Complets offrent une expérience de conduite fluide dès la sortie de la boîte. Vivez la joie du cyclisme en toute confiance, sachant que votre vélo est construit aux normes les plus élevées à Cycle Sanctuary.",
          },
        },
        contact: {
          title: "Venez Nous Visiter",
          hours: {
            title: "Heures d'ouverture",
            subtitle: {
              bike: "Vélo Boutique",
              cafe: "Café",
            },
            days: {
              monday: "Lundi",
              tuesday: "Mardi",
              wednesday: "Mercredi",
              thursday: "Jeudi",
              friday: "Vendredi",
              saturday: "Samedi",
              sunday: "Dimanche",
            },
            bike: "10h - 18h",
            cafe: { week: "8h - 17h", weekend: "9h - 17h" },
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
