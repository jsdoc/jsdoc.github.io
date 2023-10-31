const _ = require('lodash');

const { renderer } = require('./lib/markdown');

function getPageTitles(collections) {
  const pageTitles = {};

  collections.all.forEach((item) => {
    let title;

    if (item.data.tag) {
      if (collections.inlineTags.includes(item)) {
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

module.exports = (eleventyConfig) => {
  eleventyConfig.addFilter('keys', (value) => Object.keys(value));
  eleventyConfig.addFilter('relatedList', (related, collections) => {
    const pageTitles = memoizedGetPageTitles(collections);
    const relatedList = related.map((path) => {
      return {
        title: pageTitles[path],
        path,
      };
    });

    return sortBy(relatedList, 'title');
  });
  eleventyConfig.addFilter('sortTags', (value) => {
    return sortBy(value, 'data.tag');
  });

  // Use `layout.njk` as the default layout.
  eleventyConfig.addGlobalData('layout', 'layout.njk');
  // Use `/foo.html` as the output filename rather than `/foo/index.html`.
  eleventyConfig.addGlobalData('permalink', () => {
    return (data) => `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

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
