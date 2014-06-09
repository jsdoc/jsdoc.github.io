---
tag: enum
description: Document a collection of related properties.
related:
    - tags-property.html
---

## Syntax

`@enum [<type>]`


## Overview

The @enum tag documents a collection of static properties whose values are all of the same type.

An enum is similar a collection of properties, except that an enum is documented in its own doc
comment, whereas properties are documented within the doc comment of their container. Often this tag
is used with @readonly, as an enum typically represents a collection of constants.


## Examples

This shows how to document an object that represents a value with three possible states. Note that
the enum members can have optional descriptions added if you wish. Also you can override the type,
as is shown with "MAYBE" -- by default enum members will be documented with the same type as the
enum itself.

{% example "A numeric enum, representing three states" %}

```js
/**
 * Enum for tri-state values.
 * @readonly
 * @enum {number}
 */
var triState = {
    /** The true value */
    TRUE: 1,
    FALSE: -1,
    /** @type {boolean} */
    MAYBE: true
};
```
{% endexample %}
