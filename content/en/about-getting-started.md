---
title: Getting Started with JSDoc 3
description: A quick-start to documenting JavaScript with JSDoc.
---

## Getting Started

JSDoc 3 is an API documentation generator for JavaScript, similar to JavaDoc or PHPDoc. You add documentation comments directly to your source code, right along side the code itself. The JSDoc Tool will scan your source code, and generate a complete HTML documentation website for you.

## Adding Documentation Comments to Your Code

JSDoc's purpose is to document the API of your JavaScript application or library. It is assumed that you will want to document things like: namespaces, classes, methods, method parameters, etc.

JSDoc comments should generally be placed immediately before the code being documented. It must start with a `/**` sequence in order to be recognized by the JSDoc parser. Comments beginning with `/*`, `/***`, or more than 3 stars will be ignored. This is a feature to allow you to suppress parsing of comment blocks.

{% example "The simplest documentation is just a description." %}

```js
/** This is a description of the foo function. */
function foo() {
}
```
{% endexample %}

Adding a description is simple, just type the description you want in the documentaton comment.

Special "documentation tags" can be used to give more information. For example, if the function is a constructor, you can indicate this by adding a tag.

{% example "Use a documentation tag to describe your code." %}

```js
/**
 * Represents a book.
 * @constructor
 */
function Book(title, author) {
}
```
{% endexample %}

More tags can be used to add more information. See the Tag Dictionary for a complete list of tags that are recognized by JSDoc 3.

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

## Generating A Website

Once your code is commented, you can use the JSDoc 3 Tool to generate an HTML website from the source.

By default, JSDoc will use the "default" template to turn the documentation data into HTML. You can edit this template to suit your own needs, or create an entirely new template if that is what you prefer.

{% example "Running the documentation generator on the command line." %}

```
./jsdoc book.js
```
{% endexample %}

This command will create a folder named "out" in the current working directory. Within that you will find the generated HTML pages.
