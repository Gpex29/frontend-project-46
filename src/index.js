import parse from './helpers/parse.js';
import getDiffTree from './getDiffTree.js';
import formatter from './formatters/index.js';

const genDiff = (oldFilePath, newFilePath, format) => {
  const oldFile = parse(oldFilePath);
  const newFile = parse(newFilePath);
  const diffTree = getDiffTree(oldFile, newFile);
  const result = formatter(diffTree, format);
  return result;
};

export default genDiff;
