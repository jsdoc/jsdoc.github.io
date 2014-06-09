---
tag: event
description: Document an event.
related:
    - tags-fires.html
---

## Syntax

`@event <className>#[event:]<eventName>`


## Overview

The @event tag allows you to document an event that can be fired. A typical event is represented by
an object with a defined set of properties.

Once you have used the @event tag to define a specific type of event, you can use the @fires tag to
indicate that a method can fire that event.

JSDoc automatically prepends the namespace `event:` to each event's name. In general, you must
include this namespace when you link to the event in another doclet. (The @fires tag is a notable
exception; it allows you to omit the namespace.)

**Note**: JSDoc 3 uses @event doclets to document the content of an event. In contrast, JSDoc
Toolkit 2 used @event doclets to identify a function that can be fired when an event of the same
name occurs.


## Examples

The following examples show how to document an event in the `Hurl` class called `snowball`. The
event contains an object with a single property.

{% example "Documenting a function call as an event" %}

```js
/**
 * Throw a snowball.
 *
 * @fires Hurl#snowball
 */
Hurl.prototype.snowball = function() {
    /**
     * Snowball event.
     *
     * @event Hurl#snowball
     * @type {object}
     * @property {boolean} isPacked - Indicates whether the snowball is tightly packed.
     */
    this.emit('snowball', {
        isPacked: this._snowball.isPacked
    });
};
```
{% endexample %}

{% example "Using a named doclet to document an event" %}

```js
/**
 * Throw a snowball.
 *
 * @fires Hurl#snowball
 */
Hurl.prototype.snowball = function() {
    // ...
};

/**
 * Snowball event.
 *
 * @event Hurl#snowball
 * @type {object}
 * @property {boolean} isPacked - Indicates whether the snowball is tightly packed.
 */
```
{% endexample %}

The following example shows how to document events in the context of AMD modules.

{% example "Documenting events in AMD modules" %}

```js
define('playground/monitor', [], function () {
    /**
     * Keeps an eye out for snowball-throwers.
     *
     * @module playground/monitor
     */
    var exports = {
        /**
         * Report the throwing of a snowball.
         *
         * @method
         * @param {module:hurler#event:snowball} e - A snowball event.
         * @listens module:hurler#snowball
         */
        reportThrowage: function (e) {
            this.log('snowball thrown: velocity ' + e.velocity);
        }
    };

    return exports;
});

define('hurler', [], function () {
    /**
     * Event reporting that a snowball has been hurled.
     *
     * @event module:hurler#snowball
     * @property {number} velocity - The snowball's velocity, in meters per second.
     */

    /**
     * Snowball-hurling module.
     *
     * @module hurler
     */
    var exports = {
        /**
         * Attack an innocent (or guilty) person with a snowball.
         *
         * @method
         * @fires module:hurler#snowball
         */
        attack: function () {
            this.emit('snowball', { velocity: 10 });
        }
    };

    return exports;
});
```
{% endexample %}
