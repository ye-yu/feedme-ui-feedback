 // from SA: https://stackoverflow.com/a/36888120
export function luminance(colorHex: string) {
  if (colorHex.startsWith('#')) {
    colorHex = colorHex.slice(1)
  }

  if (isNaN(parseInt(colorHex, 16))) return 0

  const [R, G, B] = colorHex
    .split('')
    .reduce((a, b, i) => {
      if (i % 2 === 0) {
        a.push([b])
      } else {
        a[a.length - 1].push(b)
      }
      return a
    }, new Array<string[]>())
    .map((e) => e.join(''))
    .map((e) => parseInt(e, 16))

  const luma = (0.299 * R + 0.587 * G + 0.114 * B) / 255
  return luma
}