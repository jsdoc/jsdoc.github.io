---
tag: todo
description: Document tasks to be completed.
---

## Syntax

`@todo text describing thing to do.`


## Overview

The @todo tag allows you to document tasks to be completed for some part of your code. You can use
the @todo tag more than once in a single JSDoc comment.


## Examples

{% example "Using the @todo tag" %}

```js
/**
 * @todo Write the documentation.
 * @todo Implement this function.
 */
function foo() {
    // write me
}
```
{% endexample %}
