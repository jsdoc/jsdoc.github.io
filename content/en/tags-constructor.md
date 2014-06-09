---
tag: constructor
description: This function is intended to be called with the "new" keyword.
synonyms:
    - class
related:
    - tags-constructs.html
---

## Syntax

`@constructor [<type> <name>]`


## Overview

The @constructor tag marks an function as being a constructor, meant to be called with the new
keyword to return an instance.


## Examples

{% example "A function that constructs Person instances." %}

```js
/**
 * Creates a new Person.
 * @constructor
 */
Person = function() {
}

var p = new Person();
```
{% endexample %}
