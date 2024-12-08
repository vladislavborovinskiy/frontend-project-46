import _ from 'lodash';

const getValueToPrint = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (nodes, ancestry) => nodes
    .flatMap((node) => {
      const property = `${ancestry}${node.key}`;
      switch (node.status) {
        case 'added':
          return `Property '${property}' was added with value: ${getValueToPrint(node.value)}`;
        case 'deleted':
          return `Property '${property}' was removed`;
        case 'changed':
          return `Property '${property}' was updated. From ${getValueToPrint(node.value1)} to ${getValueToPrint(node.value2)}`;
        case 'nested':
          return iter(node.children, `${property}.`);
        case 'unchanged':
          return [];
        default:
          throw new Error(`Unknown status: ${node.status}`);
      }
    });

  return iter(tree, '').join('\n');
};

export default formatPlain;
