---
tag: returns
description: Document the return value of a function.
synonyms:
    - return
related:
    - tags-param.html
---

## Overview

The @returns tag documents the value that a function returns.


## Examples

{% example "Type of the return value" %}

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

{% example "Type and description of the return value" %}

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

{% example "The return value can have different types" %}

```js
/**
 * Returns the sum of a and b
 * @param {Number} a
 * @param {Number} b
 * @param {Boolean} retArr If set to true, the function will return an array
 * @returns {Number|Array} Sum of a and b or an array that contains a, b and the sum of a and b.
 */
function sum(a, b, retArr) {
    if (retArr) {
        return [a, b, a + b];
    }
    return a + b;
}
```
{% endexample %}
