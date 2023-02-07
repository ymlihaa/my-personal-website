const removePrefix = str => {
  return str.replace(/^\.\//, '');
};

const removePrefixAndSuffix = str => {
  return str.replace(/^\.\//, '').replace(/\.md$/, '');
};

export { removePrefix, removePrefixAndSuffix }