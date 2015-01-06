---
title: Including a Package File
description: How to show package details in your documentation.
---

Package files contain information that can be useful for your project's documentation, such as
the project's name and version number. JSDoc can automatically use information from your project's
`package.json` file when it generates documentation. For example, the default template shows
the project's name and version number in the documentation.

There are two ways to incorporate a `package.json` file into your documentation:

1. In the source paths to your JavaScript files, include the path to a `package.json` file. JSDoc
will use the first `package.json` file that it finds in your source paths.
2. Run JSDoc with the `-P/--package` command-line option, specifying the path to your `package.json`
file. This option is available in JSDoc 3.3.0 and later.

The `-P/--package` command-line option takes precedence over your source paths. If you use the
`-P/--package` command-line option, JSDoc will ignore any `package.json` files in your source paths.

The `package.json` file must use [npm's package format][package-json].

[package-json]: https://docs.npmjs.com/files/package.json


## Examples

{% example "Including a package file in your source paths" %}

```
jsdoc path/to/js path/to/package/package.json
```
{% endexample %}

{% example "Using the -P/--package option" %}

```
jsdoc --package path/to/package/package-docs.json path/to/js
```
{% endexample %}
