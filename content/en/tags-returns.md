---
tag: returns
description: Document the return value of a function.
synonyms:
    - return
related:
    - tags-param.html
    - tags-yields.html
---

## Syntax

`@returns [{type}] [description]`


## Overview

The `@returns` tag documents the value that a function returns.

If you are documenting a generator function, use the [`@yields` tag][yields-tag] instead of this
tag.

[yields-tag]: tags-yields.html


## Examples

{% example "Return value with a type" %}

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number}
 */
function sum(a, b) {
    return a + b;
}
```
{% endexample %}

{% example "Return value with a type and description" %}

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @returns {Number} Sum of a and b
 */
function sum(a, b) {
    return a + b;
}
```
{% endexample %}

{% example "Return value with multiple types" %}

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @param {Boolean} retArr If set to true, the function will return an array
 * @returns {(Number|Array)} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
}
```
{% endexample %}
