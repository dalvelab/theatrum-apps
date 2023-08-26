module.exports = {
  extends: ["next/core-web-vitals", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "object-curly-spacing": ["error", "always"]
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};