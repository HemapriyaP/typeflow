const HOME_KEYS = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

// N-gram patterns by difficulty
const BEGINNER_PATTERNS = [
  'asdf', 'jkl;', 'fdsa', ';lkj',
  'asjk', 'dfkl', 'sdfl', 'fjks',
  'af', 'sk', 'dl', 'f;',
  'aaa', 'sss', 'ddd', 'fff',
];

const INTERMEDIATE_PATTERNS = [
  'asdf jkl;', 'fdsa ;lkj', 'adfj', 'sklf',
  'asjdkfl;', 'fjdksla;', 'dfkj', 'slaf',
  'fads', 'jkl;asd', 'asdjkl', 'fj fj fj',
  'as df jk l;', 'sad lad fad',
];

const ADVANCED_PATTERNS = [
  'asdfjkl;', ';lkjfdsa', 'fjdksla;asdfjkl;',
  'afsk dlj;', 'jfkd sl;a', 'askd fjl;',
  'asjdkfl; fjdksla;', 'dfkjasl; slfjkad;',
  'dads flak flask', 'slak lads fads jabs',
  'fallsalls lads dads', 'flask flak slabs',
];

export function generateSequence(difficulty = 'beginner', length = 200) {
  let patterns;
  if (difficulty === 'beginner') patterns = BEGINNER_PATTERNS;
  else if (difficulty === 'intermediate') patterns = INTERMEDIATE_PATTERNS;
  else patterns = ADVANCED_PATTERNS;

  let result = '';
  while (result.replace(/\s/g, '').length < length) {
    const pattern = patterns[Math.floor(Math.random() * patterns.length)];
    result += pattern + ' ';
  }
  return result.trim();
}

export function generateInfiniteChunk(difficulty = 'beginner') {
  return generateSequence(difficulty, 300);
}

export const HOME_KEYS_SET = new Set(HOME_KEYS);
export { HOME_KEYS };
