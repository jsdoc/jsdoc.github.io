---
tag: example
description: Provide an example of how to use a documented item.
---

## Overview

Provide an example of how to use a documented item. The text that follows this tag will be displayed
as highlighted code.


## Examples

Note that a doclet may have multiple examples.

{% example "Documenting examples" %}

```js
/**
 * Solves equations of the form a * x = b
 * @example
 * // returns 2
 * globalNS.method1(5, 10);
 * @example
 * // returns 3
 * globalNS.method(5, 15);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
    return b / a;
};
```
{% endexample %}

Examples can also be captioned using `<caption></caption>` after the @example tag.

{% example "Documenting examples with a caption" %}

```js
/**
 * Solves equations of the form a * x = b
 * @example &lt;caption>Example usage of method1.&lt;/caption>
 * // returns 2
 * globalNS.method1(5, 10);
 * @returns {Number} Returns the value of x for the equation.
 */
globalNS.method1 = function (a, b) {
    return b / a;
};
```
{% endexample %}
