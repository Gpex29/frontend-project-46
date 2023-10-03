import _ from 'lodash';
import isObject from './helpers/isObject.js';

const getDiffTree = (before, after) => {
  const obj = { ...before, ...after };
  const keys = Object.keys(obj);
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    const oldFile = { ...before };
    const newFile = { ...after };
    const oldValue = oldFile[key];
    const newValue = newFile[key];
    if (isObject(oldValue) && isObject(newValue)) {
      return { ...acc, [key]: { status: 'merged', children: getDiffTree(oldValue, newValue) } };
    } if (!Object.hasOwn(oldFile, key)) {
      return { ...acc, [key]: { value: newValue, status: 'added' } };
    } if (!Object.hasOwn(newFile, key)) {
      return { ...acc, [key]: { value: oldValue, status: 'deleted' } };
    } if (oldValue !== newValue) {
      return {
        ...acc,
        [key]: {
          oldValue, newValue, status: 'changed',
        },
      };
    }
    return { ...acc, [key]: { value: oldValue, status: 'unchanged' } };
  }, {});
  return result;
};

export default getDiffTree;
