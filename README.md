This repository contains the user documentation for [JSDoc 3][jsdoc]. Use this repository to report
documentation bugs, and to submit pull requests for improving the docs.

If you just want to read the documentation, please visit [Use JSDoc][use-jsdoc].


## Contributing to the documentation

The documentation site is based on [Docusaurus](https://docusaurus.io/). If you'd like to contribute to the docs, make sure Node.js and npm are installed, then follow these steps:

1. Clone this repository:

        git@github.com:jsdoc/jsdoc.github.io.git


2. Install the dependencies:

        npm install

3. Make your changes in the `docs` directory, which contains the source files for the docs.

    The first few lines of each source file contain [YAML][] front matter, which is metadata in
    [YAML][] format. If you need to use the character `@` or `[` at the start of a YAML value, you
    can escape it with a backslash. For example, write `title: @class` as `title: \@class`.

4. Spawn your local instance:

        npm run

5. Build and serve locally:
        
        npm run build
        npm run serve

6. Review the updated markdown files, and make sure `npm run build` completes successfully and your changes look okay. In particular, if you edited
the YAML front matter, make sure your changes are reflected in the generated site.

7. Submit a pull request with your changes.


## Legal stuff

Copyright (c) 2011-2014 by Michael Mathews and the JSDoc 3 documentation [contributors][].

This repository is licensed under the [Creative Commons Attribution-ShareAlike 3.0 Unported][cc]
license. A copy of the license is included in the [`LICENSE` file][license].

[cc]: https://creativecommons.org/licenses/by-sa/3.0/legalcode
[contributors]: https://github.com/jsdoc/jsdoc.github.io/graphs/contributors
[Gulp]: https://gulpjs.com/
[jsdoc]: https://github.com/jsdoc/jsdoc
[license]: https://github.com/jsdoc/jsdoc.github.io/LICENSE
[Metalsmith]: https://www.metalsmith.io/
[use-jsdoc]: https://jsdoc.app/
[YAML]: https://www.yaml.org/spec/1.2/spec.html
