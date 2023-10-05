import { extname } from 'node:path';
import parse from './helpers/parse.js';
import getDiffTree from './getDiffTree.js';
import formate from './formatters/index.js';
import getPath from './helpers/getPath.js';

const genDiff = (filepath1, filepath2, format) => {
  const getFilePath1 = getPath(filepath1);
  const extension1 = extname(getFilePath1).slice(1);
  const fileData1 = parse(getFilePath1, extension1);

  const getFilePath2 = getPath(filepath2);
  const extension2 = extname(getFilePath2).slice(1);
  const fileData2 = parse(getFilePath2, extension2);

  const diffTree = getDiffTree(fileData1, fileData2);
  return formate(diffTree, format);
};

export default genDiff;
