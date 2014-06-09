---
tag: deprecated
description: Document that this is no longer the preferred way.
---

## Syntax

`@deprecated [<some text>]`


## Overview

The @deprecated tag marks a symbol in your code as being deprecated.

## Examples

You can use the @deprecated tag by itself, or include some text that describes more about the
deprecation.

{% example "Document that the old function has been deprecated since version 2.0" %}

```js
/**
 * @deprecated since version 2.0
 */
function old() {
}
```
{% endexample %}
