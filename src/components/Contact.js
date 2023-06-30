import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

function Contact({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  return (
    <section id={t("links.contact")} className="bg-light-bg px-4 py-8 lg:p-16">
      <h1 className="text-center">{t("contact.title")}</h1>
      <div
        className="grid md:grid-cols-2 mt-8"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <div className="row-span-3 col-span-2 md:col-span-1 row-start-4 md:row-start-1 mt-4 md:mt-auto md:pr-4 lg:pr-8 h-96 md:h-full">
          <iframe
            title="map"
            src={
              `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.3975371292627!2d-73.61906612392357!3d45.54232792822279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc919e88ad6a11f%3A0xb667f50873badb43!2sCourrier%20Caverne!5e0!3m2!1s` +
              language +
              `!2sca!4v1687372251787!5m2!1s` +
              language +
              `!2sca`
            }
            style={{ border: 0, height: "100%", width: "100%" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          <div></div>
        </div>
        <div className="col-span-2 md:col-span-1 text-center md:text-left">
          <h2 className="text-compliment">{t("contact.hours.title")}</h2>
          <ul>
            <li>{t("contact.hours.days.0")}: 10am - 6pm</li>
            <li>{t("contact.hours.days.1")}: 10am - 6pm</li>
            <li>{t("contact.hours.days.2")}: 10am - 6pm</li>
            <li>{t("contact.hours.days.3")}: 10am - 6pm</li>
            <li>{t("contact.hours.days.4")}: 10am - 6pm</li>
            <li>{t("contact.hours.days.5")}: 10am - 6pm</li>
            <li>
              {t("contact.hours.days.6")}: {t("contact.hours.closed")}
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 text-center md:text-left">
          <h2 className="text-compliment">{t("contact.location.title")}</h2>
          <ul>
            <li>7411 rue Saint-Hubert</li>
            <li>Montréal, Québec</li>
            <li>H2R 2N4</li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 text-center md:text-left">
          <h2 className="text-compliment">{t("contact.contact.title")}</h2>
          <ul>
            <li>
              <a href="mailto:info@courriercaverne.ca" className="underline">
                info@courriercaverne.ca
              </a>
            </li>
            <li>
              <a href="tel:5142796660" className="underline">
                514-279-6660
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact
