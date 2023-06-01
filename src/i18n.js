import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        links: {
          services: "Services",
          builds: "Builds",
          contact: "Contact",
          store: "Store",
        },
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
              services: [
                "Adjusting gears and brakes for optimal performance.",
                "Inspecting and inflating tires to the recommended pressure.",
                "Lubricating the chain and drivetrain components.",
                "Checking and tightening bolts and fittings.",
                "Assessing and adjusting headset and bottom bracket.",
                "Cleaning the bike frame and components.",
                "Ensuring proper wheel alignment and truing.",
                "Test-riding the bike to ensure smooth operation.",
              ],
            },
            {
              title: "Comprehensive",
              services: [
                "All services included in the Basic Tune-up.",
                "Removing and deep cleaning of drivetrain components.",
                "Checking and replacing cables and housing if necessary.",
                "Adjusting and aligning derailleurs for precise shifting.",
                "Checking and adjusting wheel hubs and bearings.",
                "Trueing and tensioning the wheels for optimal balance.",
                "Inspecting and adjusting headset, bottom bracket, and pedals.",
                "Checking and tightening all bolts and fittings throughout the bike.",
              ],
            },
            {
              title: "Deluxe",
              services: [
                "All services included in the Comprehensive Tune-up.",
                "Complete disassembly and degreasing of drivetrain components.",
                "Replacement of worn-out brake pads and cables.",
                "Overhaul and repacking of wheel bearings.",
                "Checking and replacing worn-out chain and cassette.",
                "Thorough cleaning and polishing of the entire bike.",
                "Fine-tuning of shifting performance for maximum precision.",
                "Adjusting and optimizing brake modulation and responsiveness.",
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
          services: "Services",
          builds: "Constructions",
          contact: "Contact",
          store: "Magasin",
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
              title: "Composants de qualité, assemblage expert",
              subtitle:
                "Notre personnel expérimenté vous aidera à choisir les composants parfaits pour votre montage.",
            },
            {
              title: "Prêt pour tous les terrains",
              subtitle:
                "De la circulation en ville au VTT, nous vous préparerons un vélo adapté à vos besoins.",
            },
          ],
        },
        intro: {
          title: "Notre magasin",
          body: "Bienvenue à Courrier Caverne, où notre amour pour les vélos et le café se rencontrent. En tant que cyclistes et amateurs de café passionnés, nous voulions créer un espace où des personnes comme nous peuvent apprécier ces deux passions. À Courrier Caverne, nous proposons un large choix de vélos et accessoires pour tous les niveaux de cyclistes. Et, lorsque vous êtes prêt à refaire le plein, notre café propose de délicieux sandwiches et du café de qualité pour vous maintenir en forme.",
        },
        services: {
          title: "Services",
          subtitle: "Révisions",
          serviceLevels: [
            {
              title: "Basique",
              services: [
                "Ajustement des vitesses et des freins pour une performance optimale.",
                "Inspection et gonflage des pneus à la pression recommandée.",
                "Lubrification de la chaîne et des composants de la transmission.",
                "Contrôle et serrage des boulons et raccords.",
                "Évaluation et ajustement du jeu de direction et du boîtier de pédalier.",
                "Nettoyage du cadre et des composants du vélo.",
                "Assure un alignement de roue correct et un centrage.",
                "Essai sur route du vélo pour assurer un fonctionnement fluide.",
              ],
            },
            {
              title: "Complet",
              services: [
                "Tous les services inclus dans la Révision Basique.",
                "Démontage et nettoyage en profondeur des composants de la transmission.",
                "Contrôle et remplacement des câbles et gaines si nécessaire.",
                "Ajustement et alignement des dérailleurs pour un changement de vitesses précis.",
                "Contrôle et ajustement des moyeux de roue et des roulements.",
                "Centrage et tension des roues pour un équilibre optimal.",
                "Inspection et ajustement du jeu de direction, du boîtier de pédalier et des pédales.",
                "Contrôle et serrage de tous les boulons et raccords sur tout le vélo.",
              ],
            },
            {
              title: "Deluxe",
              services: [
                "Tous les services inclus dans la Révision Complète.",
                "Démontage complet et dégraissage des composants de la transmission.",
                "Remplacement des plaquettes de frein et des câbles usés.",
                "Révision et reconditionnement des roulements de roue.",
                "Contrôle et remplacement de la chaîne et de la cassette usées.",
                "Nettoyage et polissage complet du vélo.",
                "Réglage précis de la performance du changement de vitesses.",
                "Ajustement et optimisation de la modulation et de la réactivité des freins.",
              ],
            },
          ],

          estimate: {
            title: "Visitez-nous pour un devis gratuit",
            body: "Obtenez un devis gratuit à Courrier Caverne aujourd'hui! Nos mécaniciens qualifiés ont les connaissances et l'expertise pour résoudre n'importe quel problème de vélo. Confiez-nous l'entretien et les réparations de votre vélo, des réglages mineurs aux réparations complexes.",
          },
        },
        builds: {
          title: "Montages",
          custom: {
            title: "Montages sur mesure",
            body: "Personnalisez votre vélo à Courrier Caverne! Nos Montages Sur Mesure sont conçus pour réaliser le vélo de vos rêves. Avec une large gamme de options de cadre, de composants et d'accessoires au choix, vous avez la liberté de créer un chef-d'œuvre unique qui reflète votre style et vos préférences uniques. Notre personnel compétent vous assistera à chaque étape, fournissant des conseils et des orientations experts pour garantir que votre montage sur mesure dépasse vos attentes. Que vous soyez un cycliste expérimenté ou un novice, Courrier Caverne est là pour vous aider à créer le vélo parfait qui correspond à votre vision.",
          },
          complete: {
            title: "Montages complets",
            body: "Découvrez la commodité et la qualité des Montages Complets à Courrier Caverne! Si vous recherchez une option prête à rouler sans tracas, nos Montages Complets sont le choix idéal. Notre sélection soigneusement choisie de vélos préassemblés assure un savoir-faire et des performances de haute qualité, soigneusement assemblés et réglés par notre équipe compétente. Que vous cherchiez un vélo de route, un VTT ou un vélo urbain, nos Montages Complets offrent une expérience de conduite fluide dès la sortie de la boîte. Vivez la joie du cyclisme en toute confiance, sachant que votre vélo est construit aux normes les plus élevées à Courrier Caverne.",
          },
        },
        contact: {
          title: "Venez nous visiter",
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
