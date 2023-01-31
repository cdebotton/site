/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  useTabs: true,
  trailingComma: "all",
  plugins: [require("prettier-plugin-tailwindcss")],
};
