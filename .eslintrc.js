// extends: ["airbnb", "prettier", "plugin:node/recommended"],
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "mocha"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    camelcase: "off",
  },
}
