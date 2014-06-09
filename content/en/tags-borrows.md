---
tag: borrows
description: This object uses something from another object.
---

## Syntax

`@borrows <that namepath> as <this namepath>`


## Overview

The @borrows tag allows you to add documentation for another symbol to your documentation.

This tag would be useful if you had more than one way to reference a function, but you didn't want
to duplicate the same documentation in two places.


## Examples

In this example there exists documentation for the "trstr" function, but "util.trim" is just a
reference to that same function by a different name.

{% example "Duplicate the documentation for trstr as util.trim" %}

```js
/**
 * @namespace
 * @borrows trstr as trim
 */
var util = {
    trim: trstr
};

/**
 * Remove whitespace from around a string.
 * @param {string} str
 */
function trstr(str) {
}
```
{% endexample %}
