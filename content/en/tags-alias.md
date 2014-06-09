---
tag: alias
description: Treat a member as if it had a different name.
related:
    - tags-name.html
    - tags-lends.html
---

## Syntax

`@alias <aliasNamepath>`


## Overview

The @alias tag causes JSDoc to treat all references to a member as if the member had a different
name. This tag is especially useful if you define a class within an inner function; in this case,
you can use the @alias tag to tell JSDoc how the class is exposed in your app.

While the @alias tag may sound similar to the @name tag, these tags behave very differently. The
@name tag tells JSDoc to ignore any code associated with the comment. For example, when JSDoc
processes the following code, it ignores the fact that the comment for `bar` is attached to a
function:

```js
/**
 * Bar function.
 * @name bar
 */
function foo() {}
```

The @alias tag tells JSDoc to pretend that Member A is actually named Member B. For example, when
JSDoc processes the following code, it recognizes that `foo` is a function, then renames `foo` to
`bar` in the documentation:

{% example %}

```js
/**
 * Bar function.
 * @alias bar
 */
function foo() {}
```
{% endexample %}

## Examples

Suppose you are using a class framework that expects you to pass in a constructor function when you
define a class. You can use the @alias tag to tell JSDoc how the class will be exposed in your app.

In the following example, the @alias tag tells JSDoc to treat the anonymous function as if it were
the constructor for the class "trackr.CookieManager". Within the function, JSDoc interprets the
`this` keyword relative to trackr.CookieManager, so the "value" method has the namepath
"trackr.CookieManager#value".

{% example "Using @alias with an anonymous constructor function" %}

```js
Klass('trackr.CookieManager',

    /**
     * @class
     * @alias trackr.CookieManager
     * @param {Object} kv
     */
    function(kv) {
        /** The value. */
        this.value = kv;
    }

);
```
{% endexample %}

You can also use the @alias tag with members that are created within an immediately invoked function
expression (IIFE). The @alias tag tells JSDoc that these members are exposed outside of the IIFE's
scope.

{% example "Using @alias for static members of a namespace" %}

```js
/** @namespace */
var Apple = {};

(function(ns) {
    /**
     * @namespace
     * @alias Apple.Core
     */
    var core = {};

    /** Documented as Apple.Core.seed */
    core.seed = function() {};

    ns.Core = core;
})(Apple);
```
{% endexample %}

For members that are defined within an object literal, you can use the @alias tag as an alternative
to the [@lends][lends-tag] tag.

{% example "Using @alias for an object literal" %}

```js
// Documenting objectA with @alias

var objectA = (function() {

    /**
     * Documented as objectA
     * @alias objectA
     * @namespace
     */
    var x = {
        /**
         * Documented as objectA.myProperty
         * @member
         */
        myProperty: 'foo'
    };

    return x;
})();

// Documenting objectB with @lends

/**
 * Documented as objectB
 * @namespace
 */
var objectB = (function() {

    /** @lends objectB */
    var x = {
        /**
         * Documented as objectB.myProperty
         * @member
         */
        myProperty: 'bar'
    };

    return x;
})();
```
{% endexample %}

[lends-tag]: tags-lends.html
