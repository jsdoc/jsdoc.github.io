This repository contains the user documentation for [JSDoc][jsdoc]. Use this repository to report
documentation bugs, and to submit pull requests for improving the docs.

If you just want to read the documentation, please visit [Use JSDoc][use-jsdoc].

## Contributing to the documentation

The HTML docs are generated with [Eleventy][eleventy]. If you'd like to contribute to the docs, make
sure Node.js and npm are installed, then follow these steps:

1.  Clone this repository:

    ```
    git clone https://github.com/jsdoc/jsdoc.github.io
    ```

2.  Install dependencies:

    ```
    npm install
    ```

3.  Make your changes in the `content` directory, which contains the source files for the docs.

    The first few lines of each source file contain [YAML][] front matter, which is metadata in
    [YAML][] format. If you need to use the character `@` or `[` at the start of a YAML value, you
    can escape it with a backslash. For example, write `title: @class` as `title: \@class`.

4.  Rebuild the HTML files, and run a local server so that you can review them:

    ```
    npm run serve
    ```


5.  Review the updated HTML files on the local server, and make sure your changes look okay. In
    particular, if you edited the YAML front matter, make sure your changes are reflected in the
    generated HTML files.

6.  Send a pull request with your changes.

## Legal stuff

Copyright 2011 by the [contributors][] to the JSDoc documentation.

This repository is licensed under the [Creative Commons Attribution-ShareAlike 3.0 Unported][cc]
license. A copy of the license is included in the [`LICENSE` file][license].

[cc]: https://creativecommons.org/licenses/by-sa/3.0/legalcode
[contributors]: https://github.com/jsdoc/jsdoc.github.io/graphs/contributors
[eleventy]: https://www.11ty.dev/
[jsdoc]: https://github.com/jsdoc/jsdoc
[license]: https://github.com/jsdoc/jsdoc.github.io/LICENSE
[use-jsdoc]: https://jsdoc.app/
[YAML]: https://yaml.org/spec/1.2.2/
