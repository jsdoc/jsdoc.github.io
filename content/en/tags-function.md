---
tag: function
description: Describe a function or method.
synonyms:
    - func
    - method
---

## Syntax

`@function [<FunctionName>]`


## Overview

This marks an object as being a function, even though it may not appear to be one to the parser. It
sets the doclet's [@kind][kind-tag] to 'function'.

[kind-tag]: tags-kind.html


## Examples

{% example "Using @function to mark a function." %}

```js
/** @function */
var paginate = paginateFactory(pages);
```
{% endexample %}

Without the @function tag, the `paginate` object would be documented as a generic object (a
[@member][member-tag]), because it isn't possible to tell from examining the line of code what type
of value `paginate` will hold when it is run.

{% example "Using @function with a name." %}

```js
/** @function myFunction */

// the above is the same as:
/** @function
 * @name myFunction */
```
{% endexample %}

[member-tag]: tags-member.html
