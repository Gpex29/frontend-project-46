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
    return `${currentSpacer}${key}: ${nested}`;
  });
  return [
    '{',
    ...result,
    `${bracketSpacer}}`,
  ].join('\n');
};

const getIndent = (type, depth) => {
  const spacer = '    ';
  switch (type) {
    case ('sign'):
      return spacer.repeat(depth).slice(0, -2);
    case ('bracket'):
      return spacer.repeat(depth - 1);
    case ('string'):
      return spacer.repeat(depth);
    default:
      throw new Error(`Unknown status: '${type}'!`);
  }
};

const stylish = (map) => {
  const iter = (data, depth) => {
    const result = data.map((obj) => {
      const { key, type } = obj;
      switch (type) {
        case ('nested'): {
          const nested = iter(obj.children, depth + 1);
          return `${getIndent('string', depth)}${key}: ${nested}`;
        }
        case ('added'): {
          return `${getIndent('sign', depth)}+ ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('removed'): {
          return `${getIndent('sign', depth)}- ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('updated'): {
          return [
            `${getIndent('sign', depth)}- ${key}: ${stringify(obj.value1, depth + 1)}`,
            `${getIndent('sign', depth)}+ ${key}: ${stringify(obj.value2, depth + 1)}`,
          ].join('\n');
        }
        case ('equal'):
          return `${getIndent('string', depth)}${key}: ${obj.value}`;
        default:
          throw new Error(`Unknown status: '${type}'!`);
      }
    });
    return [
      '{',
      ...result,
      `${getIndent('bracket', depth)}}`,
    ].join('\n');
  };
  return iter(map, 1);
};

export default stylish;
