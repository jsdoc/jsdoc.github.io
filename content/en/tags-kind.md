---
tag: kind
description: What kind of symbol is this?
related:
    - tags-type.html
---

## Syntax

`@kind <kindName>`

where `<kindName>` is one of:

+ class
+ constant
+ event
+ external
+ file
+ function
+ member
+ mixin
+ module
+ namespace
+ typedef


## Overview

The @kind tag is used to document what _kind_ of symbol is being documented (for example, a class or
a module). The _kind_ of symbol differs from a symbol's _type_ (for example, string or boolean).

Usually you do not need the @kind tag, because the symbol's kind is determined by other tags in the
doclet. For example, using the @class tag automatically implies "@kind class", and using the
@namespace tag implies "@kind namespace".


## Examples

{% example "Using @kind" %}

```js
// The following examples produce the same result:

/**
 * A constant.
 * @kind constant
 */
const asdf = 1;

/**
 * A constant.
 * @constant
 */
const asdf = 1;
```
{% endexample %}

In the case of tags with conflicting kinds (for example, using both @module, which sets the kind to
"module", and "@kind constant" which sets the kind to "constant"), the last tag determines the kind.

{% example "Conflicting @kind statements" %}

```js
/**
 * This will show up as a constant
 * @module myModule
 * @kind constant
 */

/**
 * This will show up as a module.
 * @kind constant
 * @module myModule
 */
```
{% endexample %}
