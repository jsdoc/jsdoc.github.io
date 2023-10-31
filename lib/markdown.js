const hljs = require('highlight.js');
const markdownIt = require('markdown-it');
const mdiAnchor = require('markdown-it-anchor');
const mdiAttrs = require('markdown-it-attrs');
const mdiContainer = require('markdown-it-container');
const mdiHighlight = require('markdown-it-highlightjs');

const EXAMPLE_REGEXP = /^example(?:\s+(?:"(.+)"|'(.+)'|(.+)))?$/;

function isOpenTag(token) {
  return token.nesting === 1;
}

const createTags = (exports.createTags = (md) => {
  return {
    example: {
      render: (tokens, idx) => {
        const token = tokens[idx];
        const matches = token.info.trim().match(EXAMPLE_REGEXP);

        if (isOpenTag(token)) {
          let caption = (matches[1] ?? matches[2] ?? matches[3])?.trim() ?? '';

          if (caption) {
            caption = `<figcaption>${md.utils.escapeHtml(caption)}</figcaption>`;
          }

          return `<figure>${caption}`;
        } else {
          return '</figure>';
        }
      },
      validate: (params) => params.trim().match(EXAMPLE_REGEXP),
    },
  };
});

exports.renderer = () => {
  const md = markdownIt({ html: true });
  const tags = createTags(md);

  Object.keys(tags).forEach((tagName) => {
    md.use(mdiContainer, tagName, tags[tagName]);
  });

  // Must be added before `markdown-it-anchor`.
  md.use(mdiAttrs);
  md.use(mdiAnchor);
  md.use(mdiHighlight, { hljs });

  return md;
};
