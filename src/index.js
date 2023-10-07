import { extname } from 'node:path';
import { readFileSync } from 'node:fs';
import parse from './helpers/parse.js';
import getDiffTree from './getDiffTree.js';
import formate from './formatters/index.js';
import getPath from './helpers/getPath.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const getFilePath1 = getPath(filepath1);
  const extension1 = extname(getFilePath1).slice(1);
  const readFile1 = readFileSync(getFilePath1);
  const fileData1 = parse(readFile1, extension1);

  const getFilePath2 = getPath(filepath2);
  const extension2 = extname(getFilePath2).slice(1);
  const readFile2 = readFileSync(getFilePath2);
  const fileData2 = parse(readFile2, extension2);

  const diffTree = getDiffTree(fileData1, fileData2);
  return formate(diffTree, format);
};

export default genDiff;
