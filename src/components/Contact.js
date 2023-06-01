import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

function Contact({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])

  return (
    <section id="contact" className="bg-light-bg p-16">
      <h1 className="text-center">{t("contact.title")}</h1>
      <div
        className="grid grid-cols-2 auto-rows-auto mt-8"
        style={{ gridTemplateColumns: "1fr auto" }}
      >
        <div className="row-span-3 pr-8">
          <iframe
            src={
              `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2794.387256282514!2d-73.6189176226199!3d45.542534771075466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc9193dfb48aaf1%3A0x12cea4ffb76f509b!2s7400%20St%20Andre%20St%2C%20Montreal%2C%20QC%20H2R%202P7!5e0!3m2!1s` +
              language +
              `!2sca!4v1685557812085!5m2!1s` +
              language +
              `!2sca`
            }
            style={{ border: 0, height: "100%", width: "100%" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <div></div>
        </div>
        <div>
          <h2 className="text-compliment">{t("contact.hours.title")}</h2>
          <ul>
            <li>{t("contact.hours.days.0")}: 9am - 6pm</li>
            <li>{t("contact.hours.days.1")}: 9am - 6pm</li>
            <li>{t("contact.hours.days.2")}: 9am - 6pm</li>
            <li>{t("contact.hours.days.3")}: 9am - 7pm</li>
            <li>{t("contact.hours.days.4")}: 9am - 7pm</li>
            <li>{t("contact.hours.days.5")}: 10am - 5pm</li>
            <li>
              {t("contact.hours.days.6")}: {t("contact.hours.closed")}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-compliment">{t("contact.location.title")}</h2>
          <ul>
            <li>7400 rue Saint-André</li>
            <li>Montréal, Québec</li>
            <li>H2R 2P7</li>
          </ul>
        </div>
        <div>
          <h2 className="text-compliment">{t("contact.contact.title")}</h2>
          <ul>
            <li>
              <a href="mailto:info@courriercaverne.ca" className="underline">
                info@courriercaverne.ca
              </a>
            </li>
            <li>
              <a href="tel:1234567890" className="underline">
                123-456-7890
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Contact
