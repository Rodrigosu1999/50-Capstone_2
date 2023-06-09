/** return capitalized name of country or region. */

function capitalizeWord(word) {

  const firstLetter = word.charAt(0);

  const firstLetterCap = firstLetter.toUpperCase();

  const remainingLetters = word.slice(1);

  const capitalizedWord = firstLetterCap + remainingLetters;

  return capitalizedWord;
}

module.exports = { capitalizeWord };
