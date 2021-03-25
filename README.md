# Vue Heroicons

[![npm](https://img.shields.io/npm/v/oh-vue-icons.svg?style=flat-square)](https://www.npmjs.com/package/oh-vue-icons) ![downloads](https://img.shields.io/npm/dt/oh-vue-icons.svg?style=flat-square) [![license](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)


A [Vue](https://vuejs.org/) component for including inline SVG icons from the awesome [Heroicons](https://heroicons.dev/) collection.


&nbsp;

## Features

- Tree-shakable, which allows you to only import the used icons
- Includes outlined and solid icons


&nbsp;

## Documentation

Search for icons and view the documentation [here](https://oh-vue-icons.vercel.app).


&nbsp;

## Installation

```bash
yarn add oh-vue-icons
# or
npm install oh-vue-icons
```


&nbsp;

## Import

### Global Import

Import `oh-vue-icons` and install it into Vue in `main.js`. You can only import the icons you need to reduce the bundle size.

#### Vue 2

```js
// main.js
import Vue from "vue";
import App from "./App.vue";
import OhVueIcon from "oh-vue-icons/components/icon";

import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";
OhVueIcon.add([FaFlag, RiZhihuFill]);

Vue.component("v-icon", OhVueIcon);

new Vue({
  render: h => h(App)
}).$mount("#app");
```

If you don't care about the bundle size and want to import a whole icon pack, you may should:

```js
// main.js
// import Font Awesome
import * as FaIcons from "oh-vue-icons/icons/fa";

const Fa = Object.values({ ...FaIcons });
OhVueIcon.add(Fa);
```

#### Vue 3

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import OhVueIcon from "oh-vue-icons/components/icon-v3";

import { FaFlag, RiZhihuFill } from "oh-vue-icons/icons";
OhVueIcon.add([FaFlag, RiZhihuFill]);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
```

&nbsp;

### Local Import

```js
import OhVueIcon from "oh-vue-icons/components/icon";

export default {
  components: {
    "v-icon": OhVueIcon
  }
};
```


&nbsp;

## Usage

The icon names should be passed using **kebab-case**.

```html
<template>
  <div>
    <v-icon name="fa-flag" />
    <v-icon name="ri-zhihu-fill" />
  </div>
</template>
```

For [Font Awesome 5](https://fontawesome.com/) icons, icons from `regular` pack have name prop values like `fa-regular-flag`. Icons from `solid` and `brands` pack have name prop values like `fa-beer` and `fa-github`.

See the [documentation](https://oh-vue-icons.vercel.app/docs#basic-usage) for more about the usage.


&nbsp;

## Props

| Name        | Description                              | Type      | Accepted Values                                               | Default value  |
| ----------- | ---------------------------------------- | --------- | ------------------------------------------------------------- | -------------- |
| `scale`     | Icon size                                | `number`  | /                                                             | `1`            |
| `animation` | Type of animation                        | `string`  | `wrench` / `ring` / `pulse` / `spin` / `spin-pulse` / `flash` | /              |
| `speed`     | Animation speed                          | `string`  | `slow` / `fast`                                               | /              |
| `hover`     | Enable animation only when being hovered | `boolean` | `true` / `false`                                              | `false`        |
| `flip`      | Used to flip icon                        | `string`  | `vertical` / `horizontal` / `both`                            | /              |
| `fill`      | Fill color of icon                       | `string`  | HEX color code or color name                                  | `currentColor` |
| `label`     | Icon lable                               | `string`  | /                                                             | /              |
| `title`     | Icon title                               | `string`  | /                                                             | /              |
| `inverse`   | Make icon color white?                   | `boolean` | `true` / `false`                                              | `false`        |

Some examples could be found in the [documentation](https://oh-vue-icons.vercel.app/docs#examples).


&nbsp;

## Nuxt.js

When using Nuxt.js for server side rendering, `oh-vue-icons` should be added to the transpile build option in `nuxt.config.js`:

```js
export default {
  // ...
  build: {
    transpile: ["oh-vue-icons"]
  }
}
```

or it will not be bundled, see [Nuxt's documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins) for details.


&nbsp;

## Contributing

Contributions are welcomed, learn how to contribute [here](CONTRIBUTING.md).


&nbsp;

## Acknowledgements

This project is inspired by and based on [vue-awesome](https://github.com/Justineo/vue-awesome) and [react-icons](https://github.com/react-icons/react-icons).


&nbsp;

## License

This project is [MIT](LICENSE) licensed. Icons are taken from [other projects](#supported-icon-packs), so check the license of each accordingly.
