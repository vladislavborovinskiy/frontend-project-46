import stylish from './stylish.js';
import plain from './plain.js';

const getResult = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return JSON.stringify(diff, null, 2);
    default:
      throw new Error(`Unknown format: ${format}`);
  }
};

export default getResult;
