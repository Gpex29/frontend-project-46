import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (map, formatterName) => {
  switch (formatterName) {
    case 'plain':
      return plain(map);
    default:
      return stylish(map);
  }
};
export default formatter;
