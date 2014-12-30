---
tag: module
description: Document a JavaScript module.
related:
    - tags-exports.html
    - howto-commonjs-modules.html
    - howto-amd-modules.html
---

## Syntax

`@module [[{<type>}] <moduleName>]`

In JSDoc 3.3.0 and later, `<moduleName>` may include the `module:` prefix. In previous versions, you
must omit this prefix.

Note: If you provide a type, you _must_ also provide a name.


## Overview

The @module tag marks the current file as being its own module. All symbols in the file are assumed
to be members of the module unless documented otherwise.

Link to a module (e.g. within a [@link][link-tag] or [@see][see-tag] tag) using "module:moduleName".
For example, "@module foo/bar" can be linked to using "{@link module:foo/bar}".

If the module name is not provided, it is derived from the module's path and filename. For example,
suppose I have a file `test.js`, located in the `src` directory, that contains the block comment
`/** @module */`. Here are some scenarios for running JSDoc and the resulting module names for
test.js:

{% example "Derived module names if none is provided." %}

```
# from src/
jsdoc ./test.js   # module name 'test'

# from src's parent directory:
jsdoc src/test.js # module name 'src/test'
jsdoc -r src/     # module name 'test'
```
{% endexample %}

[link-tag]: tags-inline-link.html
[see-tag]: tags-see.html


## Examples

The following example shows the namepaths that are used for symbols in a module. The first symbol
is a module-private, or "inner," variable--it can be only accessed within the module. The second
symbol is a static function that is exported by the module.

{% example "Basic @module use" %}

```js
/** @module myModule */

/** will be module:myModule~foo */
var foo = 1;

/** will be module:myModule.bar */
var bar = function() {};
```
{% endexample %}

When an exported symbol is defined as a member of `module.exports`, `exports`, or `this`, JSDoc
infers that the symbol is a static member of the module.

In the following example, the Book class is documented as a static member, "module:bookshelf.Book",
with one instance member, "module:bookshelf.Book#title".

{% example "Defining exported symbols as a member of 'this'" %}

```js
/** @module bookshelf */
/** @class */
this.Book = function (title) {
    /** The title. */
    this.title = title;
};
```
{% endexample %}

In the following example, the two functions have the namepaths "module:color/mixer.blend" and
"module:color/mixer.darken".

{% example "Defining exported symbols as a member of 'module.exports' or 'exports'" %}

```js
/** @module color/mixer */
module.exports = {
    /** Blend two colours together. */
    blend: function (color1, color2) {}
};
/** Darkens a color. */
exports.darken = function (color, shade) {};
```
{% endexample %}

See [Documenting JavaScript Modules][modules] for further examples.

[modules]: howto-commonjs-modules.html
