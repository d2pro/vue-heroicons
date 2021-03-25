const path = require("path");

module.exports = {
  icons: [
    {
      id: "ho",
      name: "heroicons-outlined",
      contents: [
        {
          files: path.resolve(__dirname, "heroicons/optimized/outline/*.svg"),
          formatter: (name) => `${name}`,
          prefix: (name) => `${name}`,
          scale: 1
        },
      ],
      projectUrl: "https://github.com/tailwindlabs/heroicons",
      website: "https://heroicons.dev/",
      license: "MIT",
      licenseUrl: "https://opensource.org/licenses/MIT"
    },
    {
      id: "hs",
      name: "heroicons-solid",
      contents: [
        {
          files: path.resolve(__dirname, "heroicons/optimized/solid/*.svg"),
          formatter: (name) => `Solid${name}`,
          prefix: (name) => `solid-${name}`,
          scale: 1
        },
      ],
      projectUrl: "https://github.com/tailwindlabs/heroicons",
      website: "https://heroicons.dev/",
      license: "MIT",
      licenseUrl: "https://opensource.org/licenses/MIT"
    }
  ]
}
