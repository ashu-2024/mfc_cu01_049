function checkPalindrome(word) {
  const reversed = word.split('').reverse().join('');
  return word === reversed;
}

function countVowels(word) {
  const vowels = 'aeiou';
  let count = 0;
  for (let char of word) {
    if (vowels.includes(char)) {
      count++;
    }
  }
  return count;
}

module.exports = { checkPalindrome, countVowels };
