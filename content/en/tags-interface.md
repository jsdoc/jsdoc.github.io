---
tag: interface
description: This symbol is an interface that others can implement.
version: '>=3.3.0'
related:
    - tags-implements.html
---

## Syntax

With the JSDoc tag dictionary (enabled by default):

`@interface [<name>]`

With the [Closure Compiler][closure] tag dictionary:

`@interface`

[closure]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#jsdoc-tags


## Overview

The `@interface` tag marks a symbol as an interface that other symbols can implement. For example,
your code might define a parent class whose methods and properties are stubbed out. You can add the
`@interface` tag to the parent class to indicate that child classes must implement the parent class'
methods and properties.

Add the `@interface` tag to the top-level symbol for the interface (for example, a constructor
function). You do not need to add the `@interface` tag to each member of the interface (for example,
the interface's instance methods).

If you are using the JSDoc tag dictionary (enabled by default), you can also define an interface
with virtual comments, rather than by writing code for the interface. See "[Virtual comments that
define an interface][virtual-comments]" for an example.

[virtual-comments]: #virtual-comments


## Examples

In the following example, the `Color` function represents an interface that other classes can
implement:

{% example "Using the @interface tag" %}

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
```
{% endexample %}

<a name="virtual-comments"></a>
The following example uses virtual comments, rather than code, to define the `Color` interface:

{% example "Virtual comments that define an interface" %}

```js
/**
 * Interface for classes that represent a color.
 *
 * @interface Color
 */

/**
 * Get the color as an array of red, green, and blue values, represented as
 * decimal numbers between 0 and 1.
 *
 * @function
 * @name Color#rgb
 * @returns {Array&lt;number>} An array containing the red, green, and blue values,
 * in that order.
 */
```
{% endexample %}
