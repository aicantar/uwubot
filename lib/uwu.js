/**
 * Checks whether the given string is uppercase
 * @param {string} str String to check
 * @returns {boolean}
 */
const isUpper = str => str === str.toUpperCase() && str !== str.toLowerCase()

/**
 * Checks whether the given string consists only of vowels
 * @param {string} str String to check
 * @returns {boolean}
 */
const isVowel = str => /[aouie]/gi.test(str)

/**
 * Converts English to UwUspeak
 * @param {string} text Text to convert
 * @returns {string}
 */
module.exports = function (text) {
  const regex = /([lrn])([^$-])/gmi
  const thregex = /th($|\b)/

  const uwu = text.replace(regex, (match, letter0, letter1) => {
    const lcLetter0 = letter0.toLowerCase()
    const lcLetter1 = letter1.toLowerCase()
    // handle n
    if (lcLetter0 === 'n') {
      if (isVowel(lcLetter1)) {
        return letter0 + 'y' + letter1 // nX -> nyX
      }

      return letter0 + letter1
    }
    // handle r
    if (lcLetter0 === 'r' && lcLetter1 === 'l') {
      return 'w' + letter1
    }
    // handle ll and rr
    if (lcLetter0 === lcLetter1) {
      return 'ww'
    }
    // default return value
    return (isUpper(letter0) ? 'W' : 'w') + letter1
  })

  // replace th at the end of the word with f
  return uwu.replace(thregex, 'f')
}
