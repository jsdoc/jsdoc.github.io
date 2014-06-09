---
tag: default
description: Document the default value.
synonyms:
    - defaultvalue
---

## Syntax

`@default [<some value>]`


## Overview

The @default tag allows you to document the assigned value of a symbol. You can supply this tag with
a value yourself or you can allow JSDoc to automatically document the value from the source code --
only possible when the documented symbol is being assigned a single, simple value that is either: a
string, a number, a boolean or null.


## Examples

In this example a constant is documented. The value of the constant is `0xff0000`. By adding the
@default tag this value is automatically added to the documentation.

{% example "Document the number value of a constant" %}

```js
/**
 *  @constant
 *  @default
 */
const RED = 0xff0000;
```
{% endexample %}
