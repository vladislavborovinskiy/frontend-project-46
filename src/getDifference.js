import path from 'path';
import { cwd } from 'process';
import parseFile from './parsers.js';

const getAbsPath = (fileName) => path.resolve(cwd(), '__fixtures__', fileName);

const buildDifference = (key, obj1, obj2, recurse) => {
  if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
    return { [`  ${key}`]: recurse(obj1[key], obj2[key]) };
  }
  if (Object.hasOwn(obj1, key) && !Object.hasOwn(obj2, key)) {
    return { [`- ${key}`]: obj1[key] };
  }
  if (!Object.hasOwn(obj1, key) && Object.hasOwn(obj2, key)) {
    return { [`+ ${key}`]: obj2[key] };
  }
  if (obj1[key] !== obj2[key]) {
    return {
      [`- ${key}`]: obj1[key],
      [`+ ${key}`]: obj2[key],
    };
  }
  return { [`  ${key}`]: obj1[key] };
};

const getDifference = (filepath1, filepath2) => {
  const object1 = parseFile(getAbsPath(filepath1));
  const object2 = parseFile(getAbsPath(filepath2));

  const inner = (obj1, obj2) => {
    const keys = [...Object.keys({ ...obj1, ...obj2 })].sort();

    return keys.reduce((acc, key) => {
      const difference = buildDifference(key, obj1, obj2, inner);
      return { ...acc, ...difference };
    }, {});
  };

  return inner(object1, object2);
};

export default getDifference;
