const glob = require("glob-promise");
const path = require("path");
const fs = require("fs").promises;

async function getIconFiles(content) {
  let files = await glob(content.files);
  files = files.sort(function(a, b) {
    const namea = a.substr(a.lastIndexOf("/") + 1),
      nameb = b.substr(b.lastIndexOf("/") + 1);
    return namea.localeCompare(nameb);
  });
  return files;
}

async function convertSVG(scale, name, svg) {
  let svgMatch = svg.match(/^<svg.*?viewBox="(.*?)".*?>(.*?)<\/svg>/);
  if (!svgMatch) {
    console.log(name, svg);
  }

  const viewbox = svgMatch[1].split(" ");
  const initW = Number(viewbox[2]),
    initH = Number(viewbox[3]);
  const raw = svgMatch[2];

  let fill = null;
  svgMatch = svg.match(/^<svg[^>]*fill="(.*?)"[^>]*>/);
  if (svgMatch) {
    fill = svgMatch[1];
  }
  let stroke = null;
  svgMatch = svg.match(/^<svg[^>]*stroke="(.*?)"[^>]*>/);
  if (svgMatch) {
    stroke = svgMatch[1];
  }
  // console.log(name, viewbox, fill, stroke);

  if (!scale) scale = 1;
  const width = initW > initH ? initW * scale : initH * scale;
  const height = initW > initH ? initW * scale : initH * scale;

  const minX = Number((-(width - initW) / 2).toFixed(3));
  const minY = Number((-(height - initH) / 2).toFixed(3));

  return {
    name: name,
    minX: minX,
    minY: minY,
    width: width,
    height: height,
    fill: fill,
    stroke: stroke,
    raw: raw
  };
}

async function writeSVG(dir, icon) {
  const filePath = path.resolve(dir, `${icon.name}.svg`);
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="${icon.minX} ${icon.minY} ${icon.width} ${icon.height}"`;
  if (icon.fill) {
    svg += ` fill="${icon.fill}"`;
  }
  if (icon.stroke) {
    svg += ` stroke="${icon.stroke}"`;
  }
  svg += `>${icon.raw}</svg>`;
  await fs.writeFile(filePath, svg);
}

async function writeRawSVG(dir, name, svgStr) {
  const filePath = path.resolve(dir, `${name}.svg`);
  await fs.writeFile(filePath, svgStr);
}

module.exports = {
  getIconFiles,
  convertSVG,
  writeSVG,
  writeRawSVG
};
