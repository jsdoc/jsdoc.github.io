const { readFileSync } = require('node:fs');

const yaml = require('js-yaml');

module.exports = (filepath) => {
  const yamlData = readFileSync(filepath, 'utf8');

  return yaml.load(yamlData);
};
