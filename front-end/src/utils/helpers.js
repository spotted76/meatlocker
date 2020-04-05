

/**
 * @brief Strips teh vowel out of the passed string
 * 
 * @param {*} stringArg original string 
 */
export function stripVowels(stringArg) {

  const vowels = ['a','e','i','o','u','y'];

  const stringArray = stringArg.split('');

  const trimmed = stringArray.filter(char => !(vowels.includes(char)));

  return trimmed.join('');

}