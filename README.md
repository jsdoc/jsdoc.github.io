Before editing the user guides for JSDoc 3, please consider these notes:

- This site is built from data files and templates
- To add or modify content you must make changes in the `Jake/extended_docs` folder
- If you create a new file in the extended documentation then you must create a new `Jake\articles` file and include the extended documentation. See any of the other articles for an example of how it's done.
- Giving the article file name an appropriate prefix will automatically add it to the index page. The supported article prefixes are `about-`, `contribute-`, `howto-`, and `plugins-`. Please do not use the `tags-` prefix or your article may be deleted in a future build.
- To properly build the documentation you must have both `jsdoc3.github.com` and the `jsdoc` projects as siblings. They must reside beside one another in a parent directory.
- Before committing, build the **HTML** by running the `jake` command in the `jsdoc3.github.com` project root. All the files will be rebuilt except for the tags definitions. The extended docs will be included but in order to get the definitions you'll have to merge the `show-defined-tags` branch of the `jsdoc` project into jsdoc.

See: https://github.com/mde/jake

If you contribute to a user guide, please add your github name and a link to your github page (only), at the bottom of the guide.

Thank you!