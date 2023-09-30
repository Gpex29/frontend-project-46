const formatter = (data) => {
  const iter = (value, depth) => {
    const length = 4;
    const spacer = ' '.repeat(length);
    const bracketSpacer = spacer.repeat(depth - 1);
    const currentSpacer = spacer.repeat(depth);
    const keys = Object.keys(value);
    const result = keys.map((key) => {
      switch (value[key].status) {
        case ('merged'): {
          const nested = iter(value[key].children, depth + 1);
          return `${currentSpacer}${key}: ${nested}`;
        }
        case ('added'):
          return `${currentSpacer.slice(0, -2)}+ ${key}: ${value[key].value}`;
        case ('deleted'):
          return `${currentSpacer.slice(0, -2)}- ${key}: ${value[key].value}`;
        case ('changed'):
          return `${currentSpacer.slice(0, -2)}- ${key}: ${value[key].oldValue}\n${currentSpacer.slice(0, -2)}+ ${key}: ${value[key].newValue}`;
        case ('unchanged'):
          return `${currentSpacer}${key}: ${value[key].value}`;
        default:
          throw new Error(`Unknown status: '${value[key].status}'!`);
      }
    });
    return [
      '{',
      ...result,
      `${bracketSpacer}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default formatter;
