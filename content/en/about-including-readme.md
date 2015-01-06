---
title: Including a README File
description: How to include a README file in your documentation.
---

There are two ways to incorporate a `README` file into your documentation:

1. In the source paths to your JavaScript files, include the path to a Markdown file named
`README.md`. JSDoc will use the first `README.md` file that it finds in your source paths.
2. Run JSDoc with the `-R/--readme` command-line option, specifying the path to your `README` file.
This option is available in JSDoc 3.3.0 and later. The `README` file may have any name and
extension, but it must be in Markdown format.

The `-R/--readme` command-line option takes precedence over your source paths. If you use the
`-R/--readme` command-line option, JSDoc will ignore any `README.md` files in your source paths.

If you are using JSDoc's default template, the `README` file's contents will be rendered in HTML
in the generated documentation's `index.html` file.


## Examples

{% example "Including a README file in your source paths" %}

```
jsdoc path/to/js path/to/readme/README.md
```
{% endexample %}

{% example "Using the -R/--readme option" %}

```
jsdoc --readme path/to/readme/README path/to/js
```
{% endexample %}
