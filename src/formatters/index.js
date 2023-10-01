import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatter = (map, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(map);
    case 'json':
      return json(map);
    default:
      return stylish(map);
  }
};
export default formatter;
