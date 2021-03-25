# Vue Heroicons

[![npm](https://img.shields.io/npm/v/@d2pro/vue-heroicons.svg?style=flat-square)](https://www.npmjs.com/package/@d2pro/vue-heroicons) ![downloads](https://img.shields.io/npm/dt/@d2pro/vue-icons.svg?style=flat-square) [![license](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)


A [Vue](https://vuejs.org/) component for including inline SVG icons from the awesome [Heroicons](https://heroicons.dev/) collection.


&nbsp;

## Features

- Tree-shakable, which allows you to only import the used icons
- Includes outlined and solid icons


&nbsp;


## Installation

```bash
yarn add @d2pro/vue-heroicons
# or
npm install @d2pro/vue-heroicons
```


&nbsp;

## Import

### Global Import

Import `@d2pro/vue-heroicons` and install it into Vue in `main.js`. You can only import the icons you need to reduce the bundle size.

#### Vue 2

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import VueHeroicons from "@d2pro/vue-heroicons/components/icon";

import { Archive, Ban, Check } from "@d2pro/vue-heroicons/icons";
VueHeroicons.add([Archive, Ban, Check]);

Vue.component("h-icon", VueHeroicons);

new Vue({
  render: h => h(App)
}).$mount("#app");
```

If you don't care about the bundle size and want to import a whole icon pack, you may should:

```js
// main.js
import * as IconsOutlined from "@d2pro/vue-heroicons/icons/ho";
import * as IconsSolid from "@d2pro/vue-heroicons/icons/hs";

const ho = Object.values({ ...IconsOutlined });
const hs = Object.values({ ...IconsOutlined });

VueHeroicons.add(ho);
VueHeroicons.add(hs);
```


### Local Import

```js
import VueHeroicon from "@d2pro/vue-heroicons/components/icon";

export default {
  components: {
    "h-icon": VueHeroicon
  }
};
```


&nbsp;

## Usage

The icon names should be passed using **kebab-case**.

```html
<template>
  <div>
    <v-icon name="arrow-left" />
    <v-icon name="arrow-narrow-left" solid />
  </div>
</template>
```

Check [Heroicons project page](https://heroicons.dev/) for a complete list of all available icons (outlined and solid).


&nbsp;

## Props

| Name        | Description                              | Type      | Accepted Values                                               | Default value  |
| ----------- | ---------------------------------------- | --------- | ------------------------------------------------------------- | -------------- |
| `name`      | Name of the icon (kebab-case)            | `string`  | Check [Heroicons project page](https://heroicons.dev/)        |                |
| `solid`     | Use the 'solid' version of teh icon      | `boolean` | `true` / `false`                                              | `false`        |
| `animation` | Type of animation                        | `string`  | `wrench` / `ring` / `pulse` / `spin` / `spin-pulse` / `flash` |                |
| `speed`     | Animation speed                          | `string`  | `slow` / `fast`                                               |                |
| `hover`     | Enable animation only when being hovered | `boolean` | `true` / `false`                                              | `false`        |
| `flip`      | Used to flip icon                        | `string`  | `vertical` / `horizontal` / `both`                            |                |
| `label`     | Icon label                               | `string`  |                                                               |                |
| `title`     | Icon title                               | `string`  |                                                               |                |


&nbsp;

## Nuxt.js

When using Nuxt.js for server side rendering, `@d2pro/vue-heroicons` should be added to the transpile build option in `nuxt.config.js`:

```js
export default {
  // ...
  build: {
    transpile: ["@d2pro/vue-heroicons"]
  }
}
```

or it will not be bundled, see [Nuxt's documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins) for details.


&nbsp;

## Contributing

Contributions are welcomed, learn how to contribute [here](CONTRIBUTING.md).


&nbsp;

## Acknowledgements

This project is inspired by and based on .


&nbsp;

## License

This project is [MIT](LICENSE) licensed. Icons are taken from [Heroicons](https://heroicons.dev/), so check the license of that project accordingly.
