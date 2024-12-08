import _ from 'lodash';
import path from 'path';
import parseFile from './parsers.js';

const getAbsPath = (fileName) => path.resolve(process.cwd(), fileName);

const getDifference = (filepath1, filepath2) => {
  const object1 = parseFile(getAbsPath(filepath1));
  const object2 = parseFile(getAbsPath(filepath2));

  const buildDifference = (obj1, obj2) => {
    const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

    return keys.map((key) => {
      if (!_.has(obj1, key)) {
        return { key, value: obj2[key], status: 'added' };
      }
      if (!_.has(obj2, key)) {
        return { key, value: obj1[key], status: 'deleted' };
      }
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, status: 'nested', children: buildDifference(value1, value2) };
      }
      if (!_.isEqual(value1, value2)) {
        return {
          key,
          value1,
          value2,
          status: 'changed',
        };
      }
      return { key, value: value1, status: 'unchanged' };
    });
  };

  return buildDifference(object1, object2);
};

export default getDifference;
