import isObject from './helpers/isObject.js';
import stringify from './helpers/stringify.js';
import getString from './helpers/getString.js';

const formatter = (map) => {
  const iter = (data, depth) => {
    const spacer = '    ';
    const bracketSpacer = spacer.repeat(depth - 1);
    const currentSpacer = spacer.repeat(depth);
    const keys = Object.keys(data);
    const result = keys.map((key) => {
      const {
        status, value, oldValue, newValue,
      } = data[key];
      switch (status) {
        case ('merged'): {
          const nested = iter(data[key].children, depth + 1);
          return getString(key, nested, currentSpacer);
        }
        case ('added'): {
          if (isObject(value)) {
            const object = stringify(value, depth + 1);
            return getString(key, object, currentSpacer, '+');
          }
          return getString(key, value, currentSpacer, '+');
        }
        case ('deleted'): {
          if (isObject(value)) {
            const object = stringify(value, depth + 1);
            return getString(key, object, currentSpacer, '-');
          }
          return getString(key, value, currentSpacer, '-');
        }
        case ('changed'): {
          if (isObject(oldValue)) {
            const oldObject = stringify(oldValue, depth + 1);
            return [
              getString(key, oldObject, currentSpacer, '-'),
              getString(key, newValue, currentSpacer, '+'),
            ].join('\n');
          }
          if (isObject(newValue)) {
            const newObject = stringify(oldValue, depth + 1);
            return [
              getString(key, oldValue, currentSpacer, '-'),
              getString(key, newObject, currentSpacer, '+'),
            ].join('\n');
          }
          return [
            getString(key, oldValue, currentSpacer, '-'),
            getString(key, newValue, currentSpacer, '+'),
          ].join('\n');
        }
        case ('unchanged'):
          return getString(key, value, currentSpacer);
        default:
          throw new Error(`Unknown status: '${status}'!`);
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

export default formatter;
