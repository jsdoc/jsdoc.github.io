---
tag: version
description: Documents the version number of an item.
related:
    - tags-since.html
---

## Overview

Documents the version of an item. The text following the @version tag will be used to denote the
version of the item.


## Examples

{% example "Using the @version tag" %}

```js
/**
 * Solves equations of the form a * x = b. Returns the value
 * of x.
 * @version 1.2.3
 * @tutorial solver
 */
function solver(a, b) {
    return b / a;
}
```
{% endexample %}
