const getStringIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);
const getBracketIndent = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - spacesCount);

const stringify = (currentValue, depth = 1) => {
  if (typeof currentValue !== 'object' || currentValue === null) {
    return `${currentValue}`;
  }
  const keys = Object.keys(currentValue);
  const result = keys.map((key) => {
    const value = currentValue[key];
    const nested = stringify(value, depth + 1);
    return `${getStringIndent(depth)}  ${key}: ${nested}`;
  });
  return [
    '{',
    ...result,
    `${getBracketIndent(depth)}}`,
  ].join('\n');
};

const stylish = (map) => {
  const iter = (data, depth) => {
    const result = data.map((obj) => {
      const { key, type } = obj;
      switch (type) {
        case ('nested'): {
          const nested = iter(obj.children, depth + 1);
          return `${getStringIndent(depth)}  ${key}: ${nested}`;
        }
        case ('added'): {
          return `${getStringIndent(depth)}+ ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('removed'): {
          return `${getStringIndent(depth)}- ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('updated'): {
          return [
            `${getStringIndent(depth)}- ${key}: ${stringify(obj.value1, depth + 1)}`,
            `${getStringIndent(depth)}+ ${key}: ${stringify(obj.value2, depth + 1)}`,
          ].join('\n');
        }
        case ('equal'):
          return `${getStringIndent(depth)}  ${key}: ${obj.value}`;
        default:
          throw new Error(`Unknown status: '${type}'!`);
      }
    });
    return [
      '{',
      ...result,
      `${getBracketIndent(depth)}}`,
    ].join('\n');
  };
  return iter(map, 1);
};

export default stylish;
