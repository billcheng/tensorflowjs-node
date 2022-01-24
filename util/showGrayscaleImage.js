const Canvas = require("canvas");

module.exports = function (array, width, height) {
  const canvas = Canvas.createCanvas(width, height);
  const ctx = canvas.getContext("2d");
  const imgData = ctx.createImageData(width, height);
  imgData.data.set(array.flatMap((value) => [value, value, value, 255]));
  ctx.putImageData(imgData, 0, 0);
  return canvas.toDataURL();
};
