---
tag: public
description: This symbol is meant to be public.
related:
    - tags-access.html
    - tags-global.html
    - tags-instance.html
    - tags-package.html
    - tags-private.html
    - tags-protected.html
    - tags-static.html
---

## Overview

The `@public` tag indicates that a symbol should be documented as if it were public.

By default, JSDoc treats all symbols as public, so using this tag does not normally affect the
generated documentation. However, you may prefer to use the `@public` tag explicitly so it is clear
to others that you intended to make the symbol public.

In JSDoc 3, the `@public` tag does _not_ affect a symbol's scope. Use the
[`@instance`][instance-tag], [`@static`][static-tag], and [`@global`][global-tag] tags to change a
symbol's scope.

[global-tag]: tags-global.html
[instance-tag]: tags-instance.html
[static-tag]: tags-static.html


## Examples

{% example "Using the @public tag" %}

```js
/**
 * The Thingy class is available to all.
 * @public
 * @class
 */
function Thingy() {
    /**
     * The Thingy~foo member. Note that 'foo' is still an inner member
     * of 'Thingy', in spite of the @public tag.
     * @public
     */
    var foo = 0;
}
```
{% endexample %}
