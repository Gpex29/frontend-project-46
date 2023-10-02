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
      acc[key] = { status: 'merged', children: getDiffTree(oldValue, newValue) };
    } else if (!Object.hasOwn(oldFile, key)) {
      acc[key] = { value: newValue, status: 'added' };
    } else if (!Object.hasOwn(newFile, key)) {
      acc[key] = { value: oldFile[key], status: 'deleted' };
    } else if (oldFile[key] !== newValue) {
      acc[key] = {
        oldValue, newValue, status: 'changed',
      };
    } else {
      acc[key] = { value: oldFile[key], status: 'unchanged' };
    }
    return acc;
  }, {});
  return result;
};

export default getDiffTree;
