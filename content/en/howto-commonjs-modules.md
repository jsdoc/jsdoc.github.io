---
title: CommonJS Modules
description: How to add JSDoc comments to CommonJS and Node.js modules.
related:
    - about-namepaths.html
    - tags-exports.html
    - tags-module.html
---

## Overview

To help you document [CommonJS modules][commonjs-modules], JSDoc 3 understands many of the
conventions used in the CommonJS specification (for example, adding properties to the `exports`
object). In addition, JSDoc recognizes the conventions of [Node.js modules][node-modules], which
extend the CommonJS standard (for example, assigning a value to `module.exports`). Depending on the
coding conventions you follow, you may need to provide some additional tags to help JSDoc understand
your code.

This page explains how to document CommonJS and Node.js modules that use several different coding
conventions. If you're documenting Asynchronous Module Definition (AMD) modules (also
known as "RequireJS modules"), see [AMD Modules][amd-modules].

[commonjs-modules]: http://wiki.commonjs.org/wiki/Modules/1.1
[node-modules]: http://nodejs.org/api/modules.html
[amd-modules]: howto-amd-modules.html


## Module identifiers

In most cases, your CommonJS or Node.js module should include a standalone JSDoc comment that
contains a [`@module` tag][module-tag]. The `@module` tag's value should be the module identifier
that's passed to the `require()` function. For example, if users load the module by calling
`require('my/shirt')`, your JSDoc comment would contain the tag `@module my/shirt`.

If you use the `@module` tag without a value, JSDoc will try to guess the correct module identifier
based on the filepath.

When you use a JSDoc [namepath][namepaths] to refer to a module from another JSDoc comment, you must
add the prefix `module:`. For example, if you want the documentation for the module `my/pants` to
link to the module `my/shirt`, you could use the [`@see` tag][see-tag] to document `my/pants` as
follows:

```js
/**
 * Pants module.
 * @module my/pants
 * @see module:my/shirt
 */
```

Similarly, the namepath for each member of the module will start with `module:`, followed by the
module name. For example, if your `my/pants` module exports a `Jeans` constructor, and `Jeans` has
an instance method named `hem`, the instance method's longname is `module:my/pants.Jeans#hem`.

[module-tag]: tags-module.html
[namepaths]: about-namepaths.html
[see-tag]: tags-see.html


## Properties of the 'exports' object

It's easiest to document symbols that are directly assigned to a property of the `exports` object.
JSDoc will automatically recognize that the module exports these symbols.

In the following example, the `my/shirt` module exports the methods `button` and `unbutton`. JSDoc
will automatically detect that the module exports these methods.

{% example "Methods added to the exports object" %}

```js
/**
 * Shirt module.
 * @module my/shirt
 */

/** Button the shirt. */
exports.button = function() {
    // ...
};

/** Unbutton the shirt. */
exports.unbutton = function() {
    // ...
};
```
{% endexample %}


<a name="local-vars"></a>
## Values assigned to local variables

In some cases, an exported symbol may be assigned to a local variable before it's added to the
`exports` object. For example, if your module exports a `wash` method, and the module itself often
calls the `wash` method, you might write the module as follows:

{% example "Method assigned to a local variable and added to the exports object" %}

```js
/**
 * Shirt module.
 * @module my/shirt
 */

/** Wash the shirt. */
var wash = exports.wash = function() {
    // ...
};
```
{% endexample %}

In this case, JSDoc will _not_ automatically document `wash` as an exported method, because the
JSDoc comment appears immediately before the local variable `wash` rather than `exports.wash`. One
solution is to add an [`@alias` tag][alias-tag] that defines the correct longname for the method. In
this case, the method is a static member of the module `my/shirt`, so the correct longname is
`module:my/shirt.wash`:

{% example "Longname defined in an @alias tag" %}

```js
/**
 * Shirt module.
 * @module my/shirt
 */

/**
 * Wash the shirt.
 * @alias module:my/shirt.wash
 */
var wash = exports.wash = function() {
    // ...
};
```
{% endexample %}

Another solution is to move the method's JSDoc comment so it comes immediately before
`exports.wash`. This change allows JSDoc to detect that `wash` is exported by the module `my/shirt`:

{% example "JSDoc comment immediately before exports.wash" %}

```js
/**
 * Shirt module.
 * @module my/shirt
 */

var wash =
/** Wash the shirt. */
exports.wash = function() {
    // ...
};
```
{% endexample %}

[alias-tag]: tags-alias.html


## Values assigned to 'module.exports'

In a Node.js module, you can assign a value directly to `module.exports`. This section explains how
to document different types of values when they are assigned to `module.exports`.

### Object literal assigned to 'module.exports'

If a module assigns an object literal to `module.exports`. JSDoc automatically recognizes that the
module exports only this value. In addition, JSDoc automatically sets the correct longname for each
property:

{% example "Object literal assigned to module.exports" %}

```js
/**
 * Color mixer.
 * @module color/mixer
 */

module.exports = {
    /**
     * Blend two colors together.
     * @param {string} color1 - The first color, in hexadecimal format.
     * @param {string} color2 - The second color, in hexadecimal format.
     * @return {string} The blended color.
     */
    blend: function(color1, color2) {
        // ...
    },

    /**
     * Darken a color by the given percentage.
     * @param {string} color - The color, in hexadecimal format.
     * @param {number} percent - The percentage, ranging from 0 to 100.
     * @return {string} The darkened color.
     */
    darken: function(color, percent) {
        // ..
    }
};
```
{% endexample %}

You can also use this pattern if you add properties to `module.exports` outside of the object
literal:

{% example "Assignment to module.exports followed by property definition" %}

```js
/**
 * Color mixer.
 * @module color/mixer
 */

module.exports = {
    /**
     * Blend two colors together.
     * @param {string} color1 - The first color, in hexadecimal format.
     * @param {string} color2 - The second color, in hexadecimal format.
     * @return {string} The blended color.
     */
    blend: function(color1, color2) {
        // ...
    }
};

/**
 * Darken a color by the given percentage.
 * @param {string} color - The color, in hexadecimal format.
 * @param {number} percent - The percentage, ranging from 0 to 100.
 * @return {string} The darkened color.
 */
module.exports.darken = function(color, percent) {
    // ..
};
```
{% endexample %}

### Function assigned to 'module.exports'

If you assign a function to `module.exports`, JSDoc will automatically set the correct longname for
the function:

{% example "Function assigned to 'module.exports'" %}

```js
/**
 * Color mixer.
 * @module color/mixer
 */

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexadecimal format.
 * @param {string} color2 - The second color, in hexadecimal format.
 * @return {string} The blended color.
 */
module.exports = function(color1, color2) {
    // ...
};
```
{% endexample %}

The same pattern works for constructor functions:

{% example "Constructor assigned to 'module.exports'" %}

```js
/**
 * Color mixer.
 * @module color/mixer
 */

/** Create a color mixer. */
module.exports = function ColorMixer() {
    // ...
};
```
{% endexample %}

### String, number, or boolean assigned to 'module.exports'

For value types (strings, numbers, and booleans) assigned to `module.exports`, you must document the
exported value's type by using the [`@type` tag][type-tag] in the same JSDoc comment as the
`@module` tag:

{% example "String assigned to module.exports" %}

```js
/**
 * Module representing the word of the day.
 * @module wotd
 * @type {string}
 */

module.exports = 'perniciousness';
```
{% endexample %}

[type-tag]: tags-type.html


## Values assigned to 'module.exports' and local variables

If your module exports symbols that are not directly assigned to `module.exports`, you can use the
[`@exports` tag][exports-tag] in place of the `@module` tag. The `@exports` tag tells JSDoc that a
symbol represents the value exported by a module.

{% example "Object literal assigned to a local variable and module.exports" %}

```js
/**
 * Color mixer.
 * @exports color/mixer
 */
var mixer = module.exports = {
    /**
     * Blend two colors together.
     * @param {string} color1 - The first color, in hexadecimal format.
     * @param {string} color2 - The second color, in hexadecimal format.
     * @return {string} The blended color.
     */
    blend: function(color1, color2) {
        // ...
    }
};

```
{% endexample %}

[alias-tag]: tags-alias.html
[exports-tag]: tags-exports.html


## Properties added to 'this'

When a module adds a property to its `this` object, JSDoc 3 automatically recognizes that the new
property is exported by the module:

{% example "Properties added to a module's 'this' object" %}

```js
/**
 * Module for bookshelf-related utilities.
 * @module bookshelf
 */

/**
 * Create a new Book.
 * @class
 * @param {string} title - The title of the book.
 */
this.Book = function(title) {
    /** The title of the book. */
    this.title = title;
}
```
{% endexample %}
