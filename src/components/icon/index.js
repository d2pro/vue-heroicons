import "../style.css";

let icons = {};

function warn(msg, vm) {
  if (!vm) {
    /* eslint-disable no-console */
    console.error(msg);
    /* eslint-enable no-console */
    return;
  }
  vm.constructor.super.util.warn(msg, vm);
}

export default {
  name: "h-icon",
  props: {
    name: {
      type: String,
      validator(val) {
        if (val && !(val in icons)) {
          warn(
            `Invalid prop: prop "name" is referring to an unregistered icon "${val}".\n` +
              `Please make sure you have imported this icon before using it.`,
            this
          );
          return false;
        }
        return true;
      }
    },
    title: String,
    animation: {
      validator(val) {
        return (
          val === "spin" ||
          val === "spin-pulse" ||
          val === "wrench" ||
          val === "ring" ||
          val === "pulse" ||
          val === "flash"
        );
      }
    },
    hover: Boolean,
    flip: {
      validator(val) {
        return val === "horizontal" || val === "vertical" || val === "both";
      }
    },
    speed: {
      validator(val) {
        return val === "fast" || val === "slow";
      }
    },
    label: String,
    inverse: Boolean
  },
  data() {
    return {
      x: false,
      y: false
    };
  },
  computed: {
    klass() {
      const classes = {
        "h-icon": true,
        "h-icon-inverse": this.inverse,
        "h-icon-flip-horizontal": this.flip === "horizontal",
        "h-icon-flip-vertical": this.flip === "vertical",
        "h-icon-flip-both": this.flip === "both",
        "h-icon-spin": this.animation === "spin",
        "h-icon-spin-pulse": this.animation === "spin-pulse",
        "h-icon-wrench": this.animation === "wrench",
        "h-icon-ring": this.animation === "ring",
        "h-icon-pulse": this.animation === "pulse",
        "h-icon-flash": this.animation === "flash",
        "h-icon-hover": this.hover,
        "h-icon-fast": this.speed === "fast",
        "h-icon-slow": this.speed === "slow"
      };

      return classes;
    },
    icon() {
      if (this.name) {
        return icons[this.name];
      }

      return null;
    },
    box() {
      if (this.icon) {
        return `${this.icon.minX} ${this.icon.minY} ${this.icon.width} ${this.icon.height}`;
      }

      return `0 0 ${this.width} ${this.height}`;
    },
    raw() {
      // generate unique id for each icon's SVG element with ID
      if (!this.icon || !this.icon.raw) {
        return null;
      }
      let raw = this.icon.raw;
      let ids = {};
      raw = raw.replace(
        /\s(?:xml:)?id=(["']?)([^"')\s]+)\1/g,
        (match, quote, id) => {
          let uniqueId = getId("vat-");
          ids[id] = uniqueId;
          return ` id="${uniqueId}"`;
        }
      );
      raw = raw.replace(
        /#(?:([^'")\s]+)|xpointer\(id\((['"]?)([^')]+)\2\)\))/g,
        (match, rawId, _, pointerId) => {
          let id = rawId || pointerId;
          if (!id || !ids[id]) return match;
          return `#${ids[id]}`;
        }
      );

      return raw;
    }
  },
  mounted() {
    this.updateStack();
  },
  updated() {
    this.updateStack();
  },
  methods: {
    updateStack() {
      if (!this.name && this.name !== null && this.$children.length === 0) {
        warn(`Invalid prop: prop "name" is required.`, this);
        return;
      }
    }
  },
  render(h) {
    if (this.name === null) {
      return h();
    }

    let options = {
      class: this.klass,
      attrs: {
        role: this.$attrs.role || (this.label || this.title ? "img" : null),
        "aria-label": this.label || null,
        "aria-hidden": !(this.label || this.title),
        viewBox: this.box
      }
    };

    if (this.icon) {
      options.attrs.fill = this.icon.fill ? this.icon.fill : null;
      options.attrs.stroke = this.icon.stroke ? this.icon.stroke : null;
    }

    if (this.x) options.attrs.x = this.x;
    if (this.y) options.attrs.y = this.y;

    const transOri = this.icon
      ? `${Number((this.icon.width / 2 + this.icon.minX).toFixed(3))} ${Number(
          (this.icon.height / 2 + this.icon.minY).toFixed(3)
        )}`
      : `50% 50%`;

    if (this.raw) {
      let html = `<g transform-origin="${transOri}">${this.raw}</g>`;
      if (this.title) html = `<title>${escapeHTML(this.title)}</title>${html}`;

      options.domProps = { innerHTML: html };
    }

    let content = this.title ? [h("title", this.title)] : [];

    return h(
      "svg",
      options,
      this.raw
        ? null
        : content.concat([
            h(
              "g",
              {
                attrs: {
                  "transform-origin": `${transOri}`
                }
              },
              this.$slots.default ||
                (this.icon
                  ? [
                      ...this.icon.paths.map((path, i) =>
                        h("path", {
                          attrs: path,
                          key: `path-${i}`
                        })
                      ),
                      ...this.icon.polygons.map((polygon, i) =>
                        h("polygon", {
                          attrs: polygon,
                          key: `polygon-${i}`
                        })
                      )
                    ]
                  : [])
            )
          ])
    );
  },
  register(data) {
    let { name, paths = [], d, polygons = [], points } = data;

    if (d) paths.push({ d });
    if (points) polygons.push({ points });

    icons[name] = assign({}, data, {
      paths,
      polygons
    });

    if (!icons[name].minX) icons[name].minX = 0;
    if (!icons[name].minY) icons[name].minY = 0;
  },
  add(data) {
    if (Array.isArray(data)) {
      for (let icon of data) {
        this.register(icon);
      }
    } else {
      this.register(data);
    }
  },
  icons
};

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function assign(obj, ...sources) {
  sources.forEach(source => {
    for (let key in source) {
      if (key === "name") continue;
      if (hasOwn(source, key)) {
        obj[key] = source[key];
      }
    }
  });
  return obj;
}

let count = 0;
function getId(prefix = "") {
  return prefix + count++;
}

const ESCAPE_MAP = {
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "&": "&amp;"
};

function escapeHTML(html) {
  return html.replace(/[<>"&]/g, c => ESCAPE_MAP[c] || c);
}
