---
tag: package
description: This symbol is meant to be package-private.
related:
    - tags-access.html
    - tags-global.html
    - tags-instance.html
    - tags-private.html
    - tags-protected.html
    - tags-public.html
    - tags-static.html
---

## Syntax

With the JSDoc tag dictionary (enabled by default):

`@package`

With the [Closure Compiler][closure] tag dictionary:

`@package [{typeExpression}]`

[closure]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#jsdoc-tags


## Overview

The `@package` tag marks a symbol as package-private. Typically, this tag indicates that a symbol is
available only to code in the same directory as the source file for this symbol. This tag is
available in JSDoc 3.5.0 and later.

By default, symbols marked with the `@package` tag will appear in your documentation. In JSDoc
3.3.0 and later, you can use the [`-a/--access` command-line option][access-option] to change this
behavior.

The `@package` tag is equivalent to `@access package`.

[access-option]: about-commandline.html


## Examples

In the following example, the instance member `Thingy#_bar` appears in the generated documentation,
but with an annotation indicating that it is package-private:

{% example "Using the @package tag" %}

```js
/** @constructor */
function Thingy() {
    /** @package */
    this._bar = 1;
}
```
{% endexample %}
