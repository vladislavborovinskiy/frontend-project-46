import _ from 'lodash';

const getIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }

  const entries = Object.entries(value)
    .map(([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`)
    .join('\n');

  return `{\n${entries}\n${getIndent(depth)}}`;
};

const formatStylish = (tree) => {
  const iter = (nodes, depth) => nodes
    .map((node) => {
      const indent = getIndent(depth).slice(0, -2);
      const braceIndent = getIndent(depth - 1);

      switch (node.status) {
        case 'added':
          return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
        case 'deleted':
          return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
        case 'unchanged':
          return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
        case 'changed':
          return [
            `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
            `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
          ].join('\n');
        case 'nested':
          return `${indent}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${braceIndent}}`;
        default:
          throw new Error(`Unknown status: ${node.status}`);
      }
    })
    .join('\n');

  return `{\n${iter(tree, 1)}\n}`;
};

export default formatStylish;
