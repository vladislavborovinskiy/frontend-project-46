import stylish from './stylish.js';
import plain from './plain.js';

const getResult = (diff, format) => (format === 'stylish' ? stylish(diff) : plain(diff));

export default getResult;
