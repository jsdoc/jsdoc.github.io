/*
  Copyright 2023 the JSDoc Authors.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      https://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import _ from 'lodash';

import { renderer } from './lib/markdown.js';

function getPageTitles({ all, inlineTags }) {
  const pageTitles = {};

  all.forEach((item) => {
    let title;

    if (item.data.tag) {
      if (inlineTags.includes(item)) {
        title = `{@${item.data.tag}}`;
      } else {
        title = `@${item.data.tag}`;
      }
    } else if (item.data.title) {
      title = item.data.title;
    }

    pageTitles[item.page.filePathStem] = title;
  });

  return pageTitles;
}

const memoizedGetPageTitles = _.memoize(getPageTitles);

function sortBy(items, key) {
  return _.sortBy(items, (item) => _.get(item, key));
}

export default (eleventyConfig) => {
  eleventyConfig.addFilter('keys', (value) => Object.keys(value));
  eleventyConfig.addFilter('relatedList', (related, collections) => {
    const pageTitles = memoizedGetPageTitles(collections);
    const relatedList = related.map((path) => ({
      title: pageTitles[path],
      path,
    }));

    return sortBy(relatedList, 'title');
  });
  eleventyConfig.addFilter('sortTags', (value) => sortBy(value, 'data.tag'));

  // Use `layout.njk` as the default layout.
  eleventyConfig.addGlobalData('layout', 'layout.njk');
  // Use `/foo.html` as the output filename rather than `/foo/index.html`.
  eleventyConfig.addGlobalData(
    'permalink',
    () =>
      ({ page }) =>
        `${page.filePathStem}.${page.outputFileExtension}`
  );

  eleventyConfig.addPassthroughCopy('./images');
  eleventyConfig.addPassthroughCopy('./styles');

  eleventyConfig.setLibrary('md', renderer());
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });

  return {
    dir: {
      data: 'data',
      includes: 'includes',
      input: 'content',
      output: '_site',
    },
    markdownTemplateEngine: 'njk',
  };
};
