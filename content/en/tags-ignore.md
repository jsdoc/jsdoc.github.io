---
tag: ignore
description: Omit a symbol from the documentation.
---

## Overview

The `@ignore` tag indicates that a symbol in your code should never appear in the documentation.
This tag takes precedence over all others.

For most JSDoc templates, including the default template, the `@ignore` tag has the following
effects:

+ If you use the `@ignore` tag with the `@class` or `@module` tag, the entire class or module will
be omitted from the documentation.
+ If you use the `@ignore` tag with the `@namespace` tag, you must also add the `@ignore` tag to any
child classes and namespaces. Otherwise, your documentation will show the child classes and
namespaces, but with incomplete names.


## Examples

In the following example, `Jacket` and `Jacket#color` will not appear in the documentation.

{% example "Class with `@ignore` tag" %}

```js
/**
 * @class
 * @ignore
 */
function Jacket() {
    /** The jacket's color. */
    this.color = null;
}
```
{% endexample %}

In the following example, the `Clothes` namespace contains a `Jacket` class. The `@ignore` tag must
be added to both `Clothes` and `Clothes.Jacket`. `Clothes`, `Clothes.Jacket`, and
`Clothes.Jacket#color` will not appear in the documentation.

{% example "Namespace with child class" %}

```js
/**
 * @namespace
 * @ignore
 */
var Clothes = {
    /**
     * @class
     * @ignore
     */
    Jacket: function() {
        /** The jacket's color. */
        this.color = null;
    }
};
```
{% endexample %}
