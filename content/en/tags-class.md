---
tag: class
description: This function is intended to be called with the "new" keyword.
synonyms:
    - constructor
related:
    - tags-constructs.html
---

## Syntax

`@class [<type> <name>]`


## Overview

The @class tag marks a function as being a constructor, meant to be called with the new
keyword to return an instance.


## Examples

{% example "A function that constructs Person instances." %}

```js
/**
 * Creates a new Person.
 * @class
 */
function Person() {
}

var p = new Person();
```
{% endexample %}
