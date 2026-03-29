import { readFileSync } from 'node:fs';

import { parse } from 'yaml';

export default (filepath) => {
  const yamlData = readFileSync(filepath, 'utf8');

  return parse(yamlData);
};
