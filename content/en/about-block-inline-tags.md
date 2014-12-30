---
title: Block and inline tags
description: Overview of block and inline JSDoc tags.
---

## Overview

JSDoc supports two different kinds of tags:

+ **Block tags**, which are at the top level of a JSDoc comment.
+ **Inline tags**, which are within the text of a block tag or a description.

Block tags usually provide detailed information about your code, such as the parameters that a
function accepts. Inline tags usually link to other parts of the documentation, similar to the
anchor tag (`<a>`) in HTML.

Block tags always begin with an at sign (`@`). Each block tag must be followed by a line break,
with the exception of the last block tag in a JSDoc comment.

Inline tags also begin with an at sign. However, inline tags and their text must be enclosed in
curly braces (`{` and `}`). The `{` denotes the start of the inline tag, and the `}` denotes the end
of the inline tag. If your tag's text includes a closing curly brace (`}`), you must escape it with
a leading backslash (`\`). You do not need to use a line break after inline tags.

Most JSDoc tags are block tags. In general, when this site refers to "JSDoc tags," we really mean
"block tags."


## Examples

In the following example, `@param` is a block tag, and `{@link}` is an inline tag:

{% example "Block and inline tags in JSDoc comments" %}

```js
/**
 * Set the shoe's color. Use {@link Shoe#setSize} to set the shoe size.
 *
 * @param {string} color - The shoe's color.
 */
Shoe.prototype.setColor = function(color) {
    // ...
};
```
{% endexample %}

You can use inline tags within a description, as shown above, or within a block tag, as shown below:

{% example "Inline tag used within a block tag" %}

```js
/**
 * Set the shoe's color.
 *
 * @param {SHOE_COLORS} color - The shoe color. Must be an enumerated
 * value of {@link SHOE_COLORS}.
 */
Shoe.prototype.setColor = function(color) {
    // ...
};
```
{% endexample %}

When you use multiple block tags in a JSDoc comment, they must be separated by line breaks:

{% example "Multiple block tags separated by line breaks" %}

```js
/**
 * Set the color and type of the shoelaces.
 *
 * @param {LACE_COLORS} color - The shoelace color.
 * @param {LACE_TYPES} type - The type of shoelace.
 */
Shoe.prototype.setLaceType = function(color, type) {
    // ...
};
```
{% endexample %}
