---
tag: mixes
description: This object mixes in all the members from another object.
related:
    - tags-borrows.html
    - tags-class.html
    - tags-mixin.html
---

## Syntax

`@mixes <OtherObjectPath>`


## Overview

The @mixes tag indicates that the current object mixes in all the members from `OtherObjectPath`,
which is a [@mixin][mixin-tag].

[mixin-tag]: tags-mixin.html


## Examples

To start, we document a mixin with the [@mixin][mixin-tag] tag:

{% example "Example of a @mixin" %}

```js
/**
 * This provides methods used for event handling. It's not meant to
 * be used directly.
 *
 * @mixin
 */
var Eventful = {
    /**
     * Register a handler function to be called whenever this event is fired.
     * @param {string} eventName - Name of the event.
     * @param {function(Object)} handler - The handler to call.
     */
    on: function(eventName, handler) {
        // code...
    },

    /**
     * Fire an event, causing all handlers for that event name to run.
     * @param {string} eventName - Name of the event.
     * @param {Object} eventData - The data provided to each handler.
     */
    fire: function(eventName, eventData) {
        // code...
    }
};
```
{% endexample %}

Now we add a FormButton class and call a "mix" function that mixes all of the Eventful functions
into FormButton, so that FormButton can also fire events and have listeners. We use the @mixes tag
to indicate that FormButton mixes the Eventful functions.

{% example "Using the @mixes tag" %}

```js
/**
 * @constructor FormButton
 * @mixes Eventful
 */
var FormButton = function() {
    // code...
};
FormButton.prototype.press = function() {
  this.fire('press', {});
}
mix(Eventful).into(FormButton.prototype);
```
{% endexample %}

[mixin-tag]: tags-mixin.html
