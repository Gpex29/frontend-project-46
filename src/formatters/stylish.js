import stringify from '../helpers/stringify.js';

const stylish = (map) => {
  const iter = (data, depth) => {
    const spacer = '    ';
    const bracketSpacer = spacer.repeat(depth - 1);
    const currentSpacer = spacer.repeat(depth);
    const signSpacer = currentSpacer.slice(0, -2);

    const result = data.map((obj) => {
      const { key, type } = obj;
      switch (type) {
        case ('nested'): {
          const nested = iter(obj.children, depth + 1);
          return `${currentSpacer}${key}: ${nested}`;
        }
        case ('added'): {
          return `${signSpacer}+ ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('removed'): {
          return `${signSpacer}- ${key}: ${stringify(obj.value, depth + 1)}`;
        }
        case ('updated'): {
          return [
            `${signSpacer}- ${key}: ${stringify(obj.value1, depth + 1)}`,
            `${signSpacer}+ ${key}: ${stringify(obj.value2, depth + 1)}`,
          ].join('\n');
        }
        case ('equal'):
          return `${currentSpacer}${key}: ${obj.value}`;
        default:
          throw new Error(`Unknown status: '${type}'!`);
      }
    });
    return [
      '{',
      ...result,
      `${bracketSpacer}}`,
    ].join('\n');
  };
  return iter(map, 1);
};

export default stylish;
