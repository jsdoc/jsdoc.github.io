---
tag: static
description: Document a static member.
related:
    - tags-global.html
    - tags-inner.html
    - tags-instance.html
---

## Overview

The @static tag indicates that a symbol is contained within a parent and can be accessed without
instantiating the parent.

Using the @static tag will override a symbol's default scope, with one exception: Symbols in global
scope will remain global.


## Examples

The following example has the same effect as writing "@function MyNamespace.myFunction" and omitting
the @memberof and @static tags:

{% example "Using @static in a virtual comment" %}

```js
/** @namespace MyNamespace */

/**
 * @function myFunction
 * @memberof MyNamespace
 * @static
 */
```
{% endexample %}

The following example forces a module's inner member to be documented as a static member:

{% example "Using @static to override the default scope" %}

```js
/** @module Rollerskate */

/**
 * The 'wheel' variable is documented as Rollerskate.wheel
 * rather than Rollerskate~wheel.
 * @static
 */
var wheel = 1;
```
{% endexample %}
