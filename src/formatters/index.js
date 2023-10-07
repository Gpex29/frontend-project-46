import stylish from './stylish.js';
import plain from './plain.js';

const formate = (data, formatter) => {
  switch (formatter) {
    case 'plain':
      return plain(data);
    case 'json':
      return JSON.stringify(data);
    case 'stylish':
      return stylish(data);
    default:
      throw new Error(`Unkown formatter: ${formatter}`);
  }
};
export default formate;
