import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import mdiAnchor from 'markdown-it-anchor';
import mdiAttrs from 'markdown-it-attrs';
import mdiContainer from 'markdown-it-container';
import mdiHighlight from 'markdown-it-highlightjs';

const EXAMPLE_REGEXP = /^example(?:\s+(?:"(.+)"|'(.+)'|(.+)))?$/;

function isOpenTag({ nesting }) {
  return nesting === 1;
}

export const createTags = ({ utils }) => ({
  example: {
    render: (tokens, idx) => {
      const token = tokens[idx];
      const matches = token.info.trim().match(EXAMPLE_REGEXP);

      if (isOpenTag(token)) {
        let caption = (matches[1] ?? matches[2] ?? matches[3])?.trim() ?? '';

        if (caption) {
          caption = `<figcaption>${utils.escapeHtml(caption)}</figcaption>`;
        }

        return `<figure>${caption}`;
      } else {
        return '</figure>';
      }
    },
    validate: (params) => params.trim().match(EXAMPLE_REGEXP),
  },
});

export function renderer() {
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
}
