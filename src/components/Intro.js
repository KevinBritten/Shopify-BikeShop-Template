import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"

function Intro({ language }) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [i18n, language])
  return (
    <section className="text-center py-20">
      <h1>{t("intro.title")}</h1>
      <p className="m-auto max-w-2xl">{t("intro.body")}</p>
    </section>
  )
}

export default Intro
