---
tag: this
description: What does the 'this' keyword refer to here?
related:
    - tags-memberof.html
---

## Syntax

`@this <namePath>`


## Overview

The @this tag indicates what the `this` keyword refers to when used within another symbol.


## Examples

In the following example, the @this tag causes "this.name" to be documented as "Greeter#name"
rather than a global symbol called "name".

```js
/** @constructor */
function Greeter(name) {
    setName.apply(this, name);
}

/** @this Greeter */
function setName(name) {
    /** document me */
    this.name = name;
}
```
