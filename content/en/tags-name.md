---
tag: name
description: Document the name of an object.
related:
    - about-namepaths.html
    - tags-alias.html
---

## Syntax
`@name <namePath>`


## Overview

The @name tag forces JSDoc to associate the remainder of the JSDoc comment with the given name,
ignoring all surrounding code. This tag is best used in "virtual comments" for symbols that are not
readily visible in the code, such as methods that are generated at runtime.

When you use the @name tag, you must provide additional tags that tell JSDoc what kind of symbol you
are documenting; whether the symbol is a member of another symbol; and so on. If you do not provide
this information, the symbol will not be documented correctly.

**Warning**: By using the @name tag, you are telling JSDoc to _ignore the surrounding code_ and
treat your documentation comment in isolation. In many cases, it is best to use the
[@alias tag][alias-tag] instead, which changes a symbol's name in the documentation but preserves
other information about the symbol.

[alias-tag]: tags-alias.html


## Examples

The following example shows how to use the @name tag to document a function that JSDoc would not
normally recognize.

{% example "Using the @name tag" %}

```js
/**
 * @name highlightSearchTerm
 * @function
 * @global
 * @param {string} term - The search term to highlight.
 */
eval("window.highlightSearchTerm = function(term) {};")
```
{% endexample %}
