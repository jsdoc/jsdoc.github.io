# CHANGELOG

## Migrate to Docusaurus

- Moved all markdown from `content/en` to `docs/`
- Removed `.eslintignore` as not required.
- Removed `data/redirects.json` and added redirects in `docusaurus.config.js`.
- Removed `data/toc.json` as the hierarchy is now maintained in the sidebar.
- Removed all html files.
- Removed `content/en/index.md` as the list can be browsed from the sidebar.
- Replaced `.gitignore` with Docusaurus generated.
- Added Docusaurus generated `babel.config.js`.
- Added contribute page.
- Changes in markdown content:
  - Replaced `{% example "Inline tag used within a block tag" %}` with `- **Inline tag used within a block tag**`.
  - Removed `{% endexample %}`.
  - Removed `.html` suffix from internal links.
  - Prettier changes.

