---
tag: implements
description: This symbol implements an interface.
version: '>=3.3.0'
related:
    - tags-interface.html
---

## Syntax

`@implements {typeExpression}`


## Overview

The `@implements` tag indicates that a symbol implements an interface.

Add the `@implements` tag to the top-level symbol that implements the interface (for example, a
constructor function). You do not need to add the `@implements` tag to each member of the
implementation (for example, the implementation's instance methods).

If you do not document one of the symbols in the implementation, JSDoc will automatically use the
interface's documentation for that symbol.


## Examples

In the following example, the `TransparentColor` class implements the `Color` interface and adds
a `TransparentColor#rgba` method.

{% example "Using the @implements tag" %}

```js
/**
 * Interface for classes that represent a color.
 *
 * @interface
 */
function Color() {}

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @returns {Array&lt;number>} An array containing the red, green, and blue values,
 * in that order.
 */
Color.prototype.rgb = function() {
    throw new Error('not implemented');
};

/**
 * Class representing a color with transparency information.
 *
 * @class
 * @implements {Color}
 */
function TransparentColor() {}

// inherits the documentation from `Color#rgb`
TransparentColor.prototype.rgb = function() {
    // ...
};

/**
 * Get the color as an array of red, green, blue, and alpha values, represented
 * as decimal numbers between 0 and 1.
 *
 * @returns {Array&lt;number>} An array containing the red, green, blue, and alpha
 * values, in that order.
 */
TransparentColor.prototype.rgba = function() {
    // ...
};
```
{% endexample %}
