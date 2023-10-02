import { extname } from 'node:path';
import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';
import path from './getPath.js';

const parse = (filepath) => {
  const getFilePath = path(filepath);
  const extension = extname(getFilePath);
  switch (extension) {
    case '.json':
      return JSON.parse(readFileSync(getFilePath));
    case '.yaml':
      return yaml.load(readFileSync(getFilePath));
    case '.yml':
      return yaml.load(readFileSync(getFilePath));
    default:
      throw new Error(`Unknown extension: '${extension}'!`);
  }
};
export default parse;
