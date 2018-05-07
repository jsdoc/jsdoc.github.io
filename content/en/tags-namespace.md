---
tag: namespace
description: Document a namespace object.
related:
    - tags-module.html
---

## Syntax

`@namespace [[{<type>}] <SomeName>]`


## Overview

The @namespace tag indicates that an object creates a namespace for its members. You can also write
a virtual JSDoc comment that defines a namespace used by your code.

If a namespace is defined by a symbol other than an object literal, you can include a type
expression along with the @namespace tag. If the @namespace tag includes a type, it must also
include a name.

You may need to document a namespace whose name includes unusual characters, such as "#" or "!". In
these cases, when you document or link to the namespace, you must add quotation marks around the
portion of the namespace that includes unusual characters. See the examples below for details.


## Examples

{% example "Using the @namespace tag with an object" %}

```js
/**
 * My namespace.
 * @namespace
 */
var MyNamespace = {
    /** documented as MyNamespace.foo */
    foo: function() {},
    /** documented as MyNamespace.bar */
    bar: 1
};
```
{% endexample %}

{% example "Using the @namespace tag for virtual comments" %}

```js
/**
 * A namespace.
 * @namespace MyNamespace
 */

/**
 * A function in MyNamespace (MyNamespace.myFunction).
 * @function myFunction
 * @memberof MyNamespace
 */
```
{% endexample %}

If a @namespace includes a symbol whose name has unusual characters, you must enclose the symbol's
name in double quotes. If the symbol's name already contains one or more double quotes, escape the
double quotes with a leading backslash (\\).

{% example "Using the @namespace tag with unusual member names" %}

```js
/** @namespace window */

/**
 * Shorthand for the alert function.
 * Refer to it as {@link window."!"} (note the double quotes).
 */
window["!"] = function(msg) { alert(msg); };
```
{% endexample %}
