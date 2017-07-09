---
tag: generator
description: Indicate that a function is a generator function.
---

## Syntax

`@generator`


## Overview

The `@generator` tag indicates that a function is a [generator function][generator], meaning that it
was declared using the syntax `function* foo() {}`. This tag is available in JSDoc 3.5.0 and later.

In general, you do not need to use this tag, because JSDoc automatically detects generator functions
and identifies them in the generated documentation. However, if you are writing a virtual comment
for a generator function that does not appear in your code, you can use this tag to tell JSDoc that
the function is a generator function.

[generator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*


## Example

The following example shows a virtual comment that uses the `@generator` tag:

{% example "Virtual comment with @generator tag" %}

```js
/**
 * Generate numbers in the Fibonacci sequence.
 *
 * @generator
 * @function fibonacci
 * @yields {number} The next number in the Fibonacci sequence.
 */
```

{% endexample %}
