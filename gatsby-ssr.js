const i18n = require("./src/i18n")

exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" })
}
