---
tag: description
description: Describe a symbol.
synonyms:
    - desc
related:
    - tags-classdesc.html
    - tags-summary.html
---

## Syntax

`@description <some description>`


## Overview

The @description tag allows you to provide a general description of the symbol you are documenting.
The description may include HTML markup. It may also include Markdown formatting if the
[Markdown plugin][markdown-plugin] is enabled.

[markdown-plugin]: plugins-markdown.html


## Examples

If you describe a symbol at the very beginning of a JSDoc comment, before using any block tags, you
may omit the @description tag.

{% example "Describing a symbol without the @description tag" %}

```js
/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
    return a + b;
}
```
{% endexample %}

By using the @description tag, you can place the description anywhere in the JSDoc comment.

{% example "Describing a symbol with the @description tag" %}

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @description Add two numbers.
 */
function add(a, b) {
    return a + b;
}
```
{% endexample %}

If there's both a description at the beginning of a JSDoc comment and a description provided with the @description tag, the description specified with the @description will override the description at the beginning of the comment.
