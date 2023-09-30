import parse from './helpers/parse.js';
import formatter from './stylish.js';
import getDiffTree from './getDiffTree.js';

const genDiff = (oldFilePath, newFilePath) => {
  const oldFile = parse(oldFilePath);
  const newFile = parse(newFilePath);
  const diffTree = getDiffTree(oldFile, newFile);
  return formatter(diffTree);
};

export default genDiff;
