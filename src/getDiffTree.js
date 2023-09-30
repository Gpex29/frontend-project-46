import isObject from './helpers/isObject.js';

const getDiffTree = (oldFile, newFile) => {
  const obj = { ...oldFile, ...newFile };
  const keys = Object.keys(obj).sort();
  const result = keys.reduce((acc, key) => {
    const oldValue = oldFile[key];
    const newValue = newFile[key];
    if (isObject(oldValue) && isObject(newValue)) { // merged
      acc[key] = { status: 'merged', children: getDiffTree(oldValue, newValue) };
    } else if (!Object.hasOwn(oldFile, key)) { // added
      acc[key] = { value: newValue, status: 'added' };
    } else if (!Object.hasOwn(newFile, key)) { // deleted
      acc[key] = { value: oldFile[key], status: 'deleted' };
    } else if (oldFile[key] !== newValue) { // changed
      acc[key] = {
        oldValue, newValue, status: 'changed',
      };
    } else { // unchanged
      acc[key] = { value: oldFile[key], status: 'unchanged' };
    }
    return acc;
  }, {});
  return result;
};

export default getDiffTree;
