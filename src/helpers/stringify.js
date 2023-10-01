import getString from './getString.js';

const stringify = (currentValue, depth) => {
  const spacer = '    ';
  if (typeof currentValue !== 'object' || currentValue === null) {
    return `${currentValue}`;
  }
  const bracketSpacer = spacer.repeat(depth - 1);
  const currentSpacer = spacer.repeat(depth);
  const keys = Object.keys(currentValue);
  const result = keys.map((key) => {
    const value = currentValue[key];
    const nested = stringify(value, depth + 1);
    return getString(key, nested, currentSpacer);
  });
  return [
    '{',
    ...result,
    `${bracketSpacer}}`,
  ].join('\n');
};

export default stringify;
