const fs = require('fs');
const path = require('path');

const inputFile = path.join(__dirname, 'random.txt');
const outputFile = path.join(__dirname, 'result.json');

const text = fs.readFileSync(inputFile, 'utf8');

const words = text.trim().split(/\s+/).filter(Boolean);
const wordCount = words.length;

const vowelCount = (text.match(/[aeiouAEIOU]/g) || []).length;

const charCount = (text.replace(/\s/g, '')).length;

const result = {
  word: wordCount,
  vowel: vowelCount,
  chars: charCount
};

fs.writeFileSync(outputFile, JSON.stringify(result, null, 2));

console.log('Analysis complete. Result saved to result.json.');
console.log(result);
