---
tag: mixin
description: Document a mixin object.
related:
    - tags-borrows.html
    - tags-class.html
    - tags-mixes.html
---

## Syntax

`@mixin [<MixinName>]`


## Overview

A mixin provides functionality that is intended to be added to other objects. If desired, you can
use the @mixin tag to indicate that an object is a mixin. You can then add the @mixes tag to objects
that use the mixin.


## Examples

{% example "Using @mixin" %}

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
