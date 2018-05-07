---
tag: protected
description: This symbol is meant to be protected.
related:
    - tags-access.html
    - tags-global.html
    - tags-instance.html
    - tags-package.html
    - tags-private.html
    - tags-public.html
    - tags-static.html
---

## Syntax

With the JSDoc tag dictionary (enabled by default):

`@protected`

With the [Closure Compiler][closure] tag dictionary:

`@protected [{typeExpression}]`

[closure]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#jsdoc-tags


## Overview

The `@protected` tag marks a symbol as protected. Typically, this tag indicates that a symbol is
only available, or should only be used, within the current module.

By default, symbols marked with the `@protected` tag will appear in your documentation. In JSDoc
3.3.0 and later, you can use the [`-a/--access` command-line option][access-option] to change this
behavior.

The `@protected` tag is equivalent to `@access protected`.

[access-option]: about-commandline.html


## Examples

In the following example, the instance member `Thingy#_bar` appears in the generated documentation,
but with an annotation indicating that it is protected:

{% example "Using the @protected tag" %}

```js
/** @constructor */
function Thingy() {
    /** @protected */
    this._bar = 1;
}
```
{% endexample %}
