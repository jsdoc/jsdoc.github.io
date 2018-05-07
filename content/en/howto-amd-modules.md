---
title: AMD Modules
description: How to add JSDoc comments to AMD and RequireJS modules.
related:
    - about-namepaths.html
    - tags-exports.html
    - tags-module.html
---

## Overview

JSDoc 3 makes it possible to document modules that use the [Asynchronous Module Definition (AMD)
API][amd-api], which is implemented by libraries such as [RequireJS][require-js]. This page explains
how to document an AMD module for JSDoc, based on the coding conventions that your module uses.

If you're documenting CommonJS or Node.js modules, see [CommonJS Modules][commonjs-modules] for
instructions.

[amd-modules]: howto-amd-modules.html
[amd-api]: https://github.com/amdjs/amdjs-api/blob/master/AMD.md
[commonjs-modules]: howto-commonjs-modules.html
[require-js]: http://requirejs.org/


## Module identifiers

When you document an AMD module, you'll use an [`@exports` tag][exports-tag] or
[`@module` tag][module-tag] to document the identifier that's passed to the `require()` function.
For example, if users load the module by calling `require('my/shirt', /* callback */)`, you'll write
a JSDoc comment that contains the tag `@exports my/shirt` or `@module my/shirt`. The examples below
can help you decide which of these tags to use.

If you use the `@exports` or `@module` tag without a value, JSDoc will try to guess the correct
module identifier based on the filepath.

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

[exports-tag]: tags-exports.html
[module-tag]: tags-module.html
[namepaths]: about-namepaths.html
[see-tag]: tags-see.html


## Function that returns an object literal

If you define your AMD module as a function that returns an object literal, use the
[`@exports` tag][exports-tag] to document the module's name. JSDoc will automatically detect that
the object's properties are members of the module.

{% example "Function that returns an object literal" %}

```js
define('my/shirt', function() {
   /**
    * A module representing a shirt.
    * @exports my/shirt
    */
    var shirt = {
        /** The module's `color` property. */
        color: 'black',

        /**
         * Create a new Turtleneck.
         * @class
         * @param {string} size - The size (`XS`, `S`, `M`, `L`, `XL`, or `XXL`).
         */
        Turtleneck: function(size) {
            /** The class's `size` property. */
            this.size = size;
        }
    };

    return shirt;
});
```
{% endexample %}

[exports-tag]: tags-exports.html


## Function that returns another function

If you define your module as a function that exports another function, such as a constructor, you
can use a standalone comment with a [`@module` tag][module-tag] to document the module. You can then
use an [`@alias` tag][alias-tag] to tell JSDoc that the function uses the same longname as the
module.

{% example "Function that returns a constructor" %}

```js
/**
 * A module representing a jacket.
 * @module my/jacket
 */
define('my/jacket', function() {
    /**
     * Create a new jacket.
     * @class
     * @alias module:my/jacket
     */
    var Jacket = function() {
        // ...
    };

    /** Zip up the jacket. */
    Jacket.prototype.zip = function() {
        // ...
    };

    return Jacket;
});
```
{% endexample %}

[alias-tag]: tags-alias.html
[module-tag]: tags-module.html


## Module declared in a return statement

If you declare your module object in a function's `return` statement, you can use a standalone
comment with a [`@module` tag][module-tag] to document the module. You can then add an
[`@alias` tag][alias-tag] to tell JSDoc that the module object has the same longname as the module.

{% example "Module declared in a return statement" %}

```js
/**
 * Module representing a shirt.
 * @module my/shirt
 */

define('my/shirt', function() {
    // Do setup work here.

    return /** @alias module:my/shirt */ {
        /** Color. */
        color: 'black',
        /** Size. */
        size: 'unisize'
    };
});
```
{% endexample %}

[alias-tag]: tags-alias.html
[module-tag]: tags-module.html


## Module object passed to a function

If the module object is passed into the function that defines your module, you can document the
module by adding an [`@exports` tag][exports-tag] to the function parameter. This pattern is
supported in JSDoc 3.3.0 and later.

{% example "Module object passed to a function" %}

```js
define('my/jacket', function(
    /**
     * Utility functions for jackets.
     * @exports my/jacket
     */
    module) {

    /**
     * Zip up a jacket.
     * @param {Jacket} jacket - The jacket to zip up.
     */
    module.zip = function(jacket) {
        // ...
    };
});
```
{% endexample %}

[exports-tag]: tags-exports.html


## Multiple modules defined in one file

If you define more than one AMD module in a single JavaScript file, use the
[`@exports` tag][exports-tag] to document each module object.

{% example "Multiple AMD modules defined in one file" %}

```js
// one module
define('html/utils', function() {
    /**
     * Utility functions to ease working with DOM elements.
     * @exports html/utils
     */
    var utils = {
        /**
         * Get the value of a property on an element.
         * @param {HTMLElement} element - The element.
         * @param {string} propertyName - The name of the property.
         * @return {*} The value of the property.
         */
        getStyleProperty: function(element, propertyName) { }
    };

    /**
     * Determine if an element is in the document head.
     * @param {HTMLElement} element - The element.
     * @return {boolean} Set to `true` if the element is in the document head,
     * `false` otherwise.
     */
    utils.isInHead = function(element) { }

    return utils;
    }
);

// another module
define('tag', function() {
    /** @exports tag */
    var tag = {
        /**
         * Create a new Tag.
         * @class
         * @param {string} tagName - The name of the tag.
         */
        Tag: function(tagName) {
            // ...
        }
    };

    return tag;
});
```
{% endexample %}

[exports-tag]: tags-exports.html
