import path from 'path';
import { cwd } from 'process';
import parseFile from './parsers.js';

const getAbsPath = (fileName) => path.resolve(cwd(), '__fixtures__', fileName);

const getDifference = (filepath1, filepath2) => {
  const object1 = parseFile(getAbsPath(filepath1));
  const object2 = parseFile(getAbsPath(filepath2));

  const inner = (obj1, obj2) => {
    const keys = [...Object.keys({ ...obj1, ...obj2 })].sort();

    return keys.reduce((acc, key) => {
      if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
        return { ...acc, [`  ${key}`]: inner(obj1[key], obj2[key]) };
      }
      if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
        return { ...acc, [`- ${key}`]: obj1[key] };
      }
      if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
        return { ...acc, [`+ ${key}`]: obj2[key] };
      }
      if (obj1[key] !== obj2[key]) {
        return { ...acc, [`- ${key}`]: obj1[key], [`+ ${key}`]: obj2[key] };
      }
      return { ...acc, [`  ${key}`]: obj1[key] };
    }, {});
  };

  return inner(object1, object2);
};

export default getDifference;
