---
title: Getting Started with JSDoc 3
description: A quick-start to documenting JavaScript with JSDoc.
---

## Getting started

JSDoc 3 is an API documentation generator for JavaScript, similar to Javadoc or phpDocumentor. You
add documentation comments directly to your source code, right alongside the code itself. The JSDoc
tool will scan your source code and generate an HTML documentation website for you.

## Adding documentation comments to your code

JSDoc's purpose is to document the API of your JavaScript application or library. It is assumed that
you will want to document things like modules, namespaces, classes, methods, method parameters, and
so on.

JSDoc comments should generally be placed immediately before the code being documented. Each comment
must start with a `/**` sequence in order to be recognized by the JSDoc parser. Comments beginning
with `/*`, `/***`, or more than 3 stars will be ignored. This is a feature to allow you to suppress
parsing of comment blocks.

{% example "The simplest documentation is just a description" %}

```js
/** This is a description of the foo function. */
function foo() {
}
```
{% endexample %}

Adding a description is simple—just type the description you want in the documentation comment.

Special "JSDoc tags" can be used to give more information. For example, if the function is a
constructor for a class, you can indicate this by adding a `@constructor` tag.

{% example "Use a JSDoc tag to describe your code" %}

```js
/**
 * Represents a book.
 * @constructor
 */
function Book(title, author) {
}
```
{% endexample %}

More tags can be used to add more information. See the [home page][block-tags] for a complete list
of tags that are recognized by JSDoc 3.

{% example "Adding more information with tags" %}

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
}
```
{% endexample %}

[block-tags]: index.html#block-tags

## Generating a website

Once your code is commented, you can use the JSDoc 3 tool to generate an HTML website from your
source files.

By default, JSDoc uses the built-in "default" template to turn the documentation into HTML. You can
edit this template to suit your own needs or create an entirely new template if that is what you
prefer.

{% example "Running the documentation generator on the command line" %}

```
jsdoc book.js
```
{% endexample %}

This command will create a directory named `out/` in the current working directory. Within that
directory, you will find the generated HTML pages.
