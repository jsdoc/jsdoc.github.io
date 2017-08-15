---
tag: type
description: Document the type of an object.
related:
    - tags-callback.html
    - tags-typedef.html
    - tags-param.html
    - tags-property.html
---

## Syntax

`@type {typeName}`


## Overview

The `@type` tag allows you to provide a type expression identifying the type of value that a symbol
may contain, or inline to indicate that a symbol is of a specific type.

The parameter type can be a built-in JavaScript type, such as `number` or `Object`, or a
[JSDoc namepath][namepath] to another symbol in your code. If you have written documentation for the
symbol at that namepath, JSDoc will automatically link to the documentation for that symbol. You can
also use a type expression to indicate further properties of the type; see the
[types documentation][about-types] for details.

[namepath]: about-namepaths.html
[about-types]: about-types.html

## Examples

{% example "Example" %}

```js
/** @type {(string|Array.<string>)} */
var foo;
/** @type {number} */
var bar = 1;
```
{% endexample %}

In many cases, you can include a type expression as part of another tag, rather than including a
separate @type tag in your JSDoc comment.

{% example "Type expressions can accompany many tags." %}

```js
/**
 * @type {number}
 * @const
 */
var FOO = 1;

// same as:

/** @const {number} */
var FOO = 1;
```
{% endexample %}

To indicate that a variable is of a certain type, you can cast it with @type. The surrounding
parentheses are required.

{% example "Cast a variable to a specific type." }

```js
method(/** @type {Array&lt;string&gt;} */ (value));
```