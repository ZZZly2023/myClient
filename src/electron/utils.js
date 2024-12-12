// NativeImage 原生封装图片，例如托盘、停靠栏和应用图标。
const { nativeImage } = require('electron');

createEmptyImage = () => {
  return nativeImage.createEmpty()
}
createThumbnailFromPath = (path, size) => {
  return nativeImage.createFromPath(path).resize(size)
}
createFromPath = (path) => {
  return nativeImage.createFromPath(path)
}
createFromBuffer = (buffer) => {
  return nativeImage.createFromBuffer(buffer)
}
createFromDataURL = (dataURL) => {
  return nativeImage.createFromDataURL(dataURL)
}
// options = {width, height, scaleFactor}
createFromBitmap = (buffer, options) => {
  return nativeImage.createFromBitmap(buffer, options)
}
// hslShift = {hue, saturation, lightness} 色调 饱和度 亮度
createFromNamedImage = (name, hslShift) => {
  return nativeImage.createFromNamedImage(name, hslShift)
}

const imageHanders = {
  createEmptyImage,
  createThumbnailFromPath,
  createFromPath,
  createFromBuffer,
  createFromDataURL,
  createFromBitmap,
  createFromNamedImage
}