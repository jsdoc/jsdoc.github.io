---
tag: desc
description: Describe a symbol.
synonyms:
    - description
related:
    - tags-classdesc.html
    - tags-summary.html
---

## Syntax

`@desc <some description>`


## Overview

The @desc tag allows you to provide a general description of the symbol you are documenting. The
description may include HTML markup. It may also include Markdown formatting if the
[Markdown plugin][markdown-plugin] is enabled.

[markdown-plugin]: plugins-markdown.html


## Examples

If you describe a symbol at the very beginning of a JSDoc comment, before using any block tags, you
may omit the @desc tag.

{% example "Describing a symbol without the @desc tag" %}

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

By using the @desc tag, you can place the description anywhere in the JSDoc comment.

{% example "Describing a symbol with the @desc tag" %}

```js
/**
 * @param {number} a
 * @param {number} b
 * @returns {number}
 * @desc Add two numbers.
 */
function add(a, b) {
    return a + b;
}
```
{% endexample %}
