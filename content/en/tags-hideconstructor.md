---
tag: hideconstructor
description: Indicate that the constructor should not be displayed.
related:
	- tags-class.html
---

## Syntax

`@hideconstructor`


## Overview

The `@hideconstructor` tag tells JSDoc that the generated documentation should not display the
constructor for a class. This tag is available in JSDoc 3.5.0 and later.

For pre-ES2015 classes, use this tag in combination with the [`@class` or `@constructor`
tag][tags-class].

For ES2015 classes, use this tag in the JSDoc comment for your constructor. If your class does not
have an explicit constructor, use this tag in the JSDoc comment for the class.

[tags-class]: tags-class.html


## Examples

{% example "@hideconstructor tag with pre-ES2015 class" %}

```js
/**
 * @classdesc Toaster singleton.
 * @class
 * @hideconstructor
 */
var Toaster = (function() {
    var instance = null;

    function Toaster() {}

    /**
     * Toast an item.
     *
     * @alias toast
     * @memberof Toaster
     * @instance
     * @param {BreadyThing} item - The item to toast.
     * @return {Toast} A toasted bready thing.
     */
    Toaster.prototype.toast = function(item) {};

    return {
        /**
         * Get the Toaster instance.
         *
         * @alias Toaster.getInstance
         * @returns {Toaster} The Toaster instance.
         */
        getInstance: function() {
            if (instance === null) {
                instance = new Toaster();
                delete instance.constructor;
            }

            return instance;
        }
    };
})();
```
{% endexample %}

{% example "@hideconstructor tag with ES2015 class" %}

```js
/**
 * Waffle iron singleton.
 */
class WaffleIron {
    #instance = null;

    /**
     * Create the waffle iron.
     *
     * @hideconstructor
     */
    constructor() {
        if (#instance) {
            return #instance;
        }

        /**
         * Cook a waffle.
         *
         * @param {Batter} batter - The waffle batter.
         * @return {Waffle} The cooked waffle.
         */
        this.cook = function(batter) {};

        this.#instance = this;
    }

    /**
     * Get the WaffleIron instance.
     *
     * @return {WaffleIron} The WaffleIron instance.
     */
    getInstance() {
        return new WaffleIron();
    }
}
```
{% endexample %}
