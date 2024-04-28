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
              `https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2796.802553801268!2d-73.57312691366495!3d45.49392065688533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDXCsDI5JzM4LjEiTiA3M8KwMzQnMDUuNyJX!5e0!3m2!1s0` +
              language +
              `!2sca!4v1714337586497!5m2!1s` +
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
            <h3>{t("contact.hours.subtitle.bike")}</h3>
            <li>
              {t("contact.hours.days.monday")}: {t("contact.hours.closed")}
            </li>
            <li>
              {t("contact.hours.days.tuesday")} -{" "}
              {t("contact.hours.days.sunday")}: {t("contact.hours.bike")}
            </li>
            <h3>{t("contact.hours.subtitle.cafe")}</h3>
            <li>
              {t("contact.hours.days.monday")} -{" "}
              {t("contact.hours.days.friday")}: {t("contact.hours.cafe.week")}
            </li>
            <li>
              {t("contact.hours.days.saturday")} -{" "}
              {t("contact.hours.days.sunday")}:{" "}
              {t("contact.hours.cafe.weekend")}
            </li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 text-center md:text-left">
          <h2 className="text-compliment">{t("contact.location.title")}</h2>
          <ul>
            <li>1337 Rue Barré</li>
            <li>Montréal, Québec</li>
            <li>H3C 1N3</li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1 text-center md:text-left">
          <h2 className="text-compliment">{t("contact.contact.title")}</h2>
          <ul>
            <li>
              <a href="mailto:info@cyclesanctuary.ca" className="underline">
                info@cyclesanctuary.ca
              </a>
            </li>
            <li>
              <a href="cafe@cyclesanctuary.ca" className="underline">
                cafe@cyclesanctuary.ca{" "}
              </a>
            </li>
            <li>
              <a href="tel:5555555555" className="underline">
                555-555-5555
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact
