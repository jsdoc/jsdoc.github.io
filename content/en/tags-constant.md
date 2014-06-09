---
tag: constant
description: Document an object as a constant.
synonyms:
    - const
related:
    - tags-default.html
    - tags-type.html
---

## Syntax

`@constant [<type> <name>]`


## Overview

The @constant tag is used to mark the documentation as belonging to a symbol that is a constant.


## Examples

In this example we are documenting a string constant. Note that although the code is using the
`const` keyword, this is not required by JSDoc. If your JavaScript host environment doesn't yet
support constant declarations, the @const documentation can just as effectively be used on `var`
declarations.

{% example "A string constant representing the color red" %}

```js
/** @constant
    @type {string}
    @default
*/
const RED = 'FF0000';

/** @constant {number} */
var ONE = 1;
```
{% endexample %}

Note that the example provides the type in a @type tag. This is optional. Also the optional
@default tag is used here too, this will automatically add whatever the assigned value is (for
example 'FF0000') to the documentation.
