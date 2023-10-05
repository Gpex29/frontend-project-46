import yaml from 'js-yaml';
import { readFileSync } from 'node:fs';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(readFileSync(data));
    case 'yaml':
      return yaml.load(readFileSync(data));
    case 'yml':
      return yaml.load(readFileSync(data));
    default:
      throw new Error(`Unknown extension: '${format}'!`);
  }
};
export default parse;
