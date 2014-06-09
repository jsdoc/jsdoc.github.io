---
title: Document CommonJS Modules
description: Documenting code that conforms to the CommonJS module standard.
---

## Overview

JSDoc 3 has built-in support for JavaScript code that is written to conform to the [CommonJS Modules standard][commonjs-modules]. In addition, JSDoc supports [Node.js modules][node-modules], which extend the CommonJS standard. This allows you to easily document your own JavaScript modules and the members they export.

[commonjs-modules]: http://wiki.commonjs.org/wiki/Modules/1.1
[node-modules]: http://nodejs.org/api/modules.html

## Document a Simple CommonJS Module

Add a single `@module <module identifier>` tag at the top of the file that defines your module and any documented members of the `exports` object in that file will automatically be included in the documentation for that module.

{% example "The putOn and unbutton methods are documented as members of the \"my/shirt\" module." %}

```js
/** @module my/shirt */

/** Try it on. */
exports.putOn = function(someShirt) {
}

/** Make it easier to put on and remove. */
exports.unbutton = function(someShirt) {
}
```
{% endexample %}

## Document Members Assigned to `module.exports`

In a Node.js module, you can assign an object literal to `module.exports` directly. This pattern is automatically supported by JSDoc 3.

{% example "The blend and darken methods are documented as members of the \"color/mixer\" module." %}

```js
/** @module color/mixer */

module.exports = {
    /** Blend two colors together. */
    blend: function(color1, color2) { }
}

/** Darken a color by the given shade. */
exports.darken = function(color, shade) { }
```
{% endexample %}

## Document Members Exported on the Module's `this` Object

JSDoc 3 understands the convention of exporting properties and functions when they are assigned to the module's `this` object, as shown below.

{% example "The Book class is documented as a member of the \"bookshelf\" module. %}

```js
/**
 * @module bookshelf
 */

/**
 * @class
 */
this.Book = function(title) {
    /** The title of the book. */
    this.title = title;
}
```
{% endexample %}

## Document a Function that returns an AMD Module

Modules can also be written using the [Asynchronous Module Definition (AMD) API][amd-api], which is implemented by libraries such as [RequireJS][require-js]. The AMD format provides a `define` method that allows you to write a function to return a module object. Use the [@exports][exports-tag] tag to document that all the members of an object literal should be documented as members of a module.

{% example "The color property and the Turtleneck class are documented as members of the \"my/shirt\" module." %}

```js
define('my/shirt', function () {
   /**
    * A module representing a shirt.
    * @exports my/shirt
    * @version 1.0
    */
    var shirt = {

        /** A property of the module. */
        color: "black",

        /** @constructor */
        Turtleneck: function(size) {
            /** A property of the class. */
            this.size = size;
        }
    };

    return shirt;
});
```
{% endexample %}

[amd-api]: https://github.com/amdjs/amdjs-api/blob/master/AMD.md
[exports-tag]: tags-exports.html
[require-js]: http://requirejs.org/

## Document a Module as a Constructor

The following examples illustrate patterns for documenting modules that are constructors.

{% example "Use the @alias tag to simplify documenting an AMD constructor-module." %}

```js
/**
 * A module representing a jacket.
 * @module jacket
 */
define('jacket', function () {
    /**
     * @constructor
     * @alias module:jacket
     */
    var exports = function() {
    }

    /** Open and close your Jacket. */
    exports.prototype.zip = function() {
    }

    return exports;
});
```
{% endexample %}

The same pattern can be documented in CommonJS environments.

{% example "Use the @alias tag to document constructor-modules in CommonJS." %}

```js
/**
 * A module representing a jacket.
 * @module jacket
 */

/**
 * @constructor
 * @alias module:jacket
 */
function Jacket() {
}

/** Open and close your Jacket. */
Jacket.prototype.zip = function() {
}

module.exports = Jacket;
```
{% endexample %}

## Document Multiple AMD Modules Defined in a Single File

If you have multiple calls to `define` in a single file use the [@exports][exports-tag] tag to document each function that returns module code. Name the exported objects "exports" and JSDoc 3 will automatically document any of their members as members of their module.

{% example "The getStyleProperty and isInHead methods are documented as members of the \"html/utils\" module. The Tag class is documented as a member of the \"tag\" module." %}

```js
// one module
define('html/utils',
    /**
     * Utility functions to ease working with DOM elements.
     * @exports html/utils
     */
    function() {
        var exports = {
            /** Get the value of a property on an element. */
            getStyleProperty: function(element, propertyName) { }
        };

        /** Determine if an element is in the document head. */
        exports.isInHead = function(element) { }

        return exports;
    }
);

// another module
define('tag',
    /** @exports tag */
    function() {
        var exports = {
            /** @class */
            Tag: function(tagName) { }
        };

        return exports;
    }
);
```
{% endexample %}

[exports-tag]: tags-exports.html
