---
tag: see
description: Refer to some other documentation for more information.
related:
    - tags-inline-link.html
---

## Syntax

+ `@see <namepath>`
+ `@see <text>`


## Overview

The @see tag allows you to refer to another symbol or resource that may be related to the one being
documented. You can provide either a symbol's namepath or free-form text. If you provide a namepath,
JSDoc's default template automatically converts the namepath to a link.


## Examples

{% example "Using the @see tag" %}

```js
/**
 * Both of these will link to the bar function.
 * @see {@link bar}
 * @see bar
 */
function foo() {}

// Use the inline {@link} tag to include a link within a free-form description.
/**
 * @see {@link foo} for further information.
 * @see {@link http://github.com|GitHub}
 */
function bar() {}
```
{% endexample %}
