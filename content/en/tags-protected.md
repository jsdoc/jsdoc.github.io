---
tag: protected
description: This member is meant to be protected.
related:
    - tags-access.html
    - tags-global.html
    - tags-instance.html
    - tags-private.html
    - tags-public.html
    - tags-static.html
---

## Overview

This tag marks a doclet as protected.

Note that "@protected" is equivalent to "@access protected". See [@access][access-tag] for details.

[access-tag]: tags-access.html


## Examples

{% example "Using the @protected tag" %}

```js
/** @constructor */
function Thingy() {
    /** @protected */
    this._bar = 1;
}
```
{% endexample %}
