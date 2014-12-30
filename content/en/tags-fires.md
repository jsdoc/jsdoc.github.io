---
tag: fires
description: Describe the events this method may fire.
synonyms:
    - emits
related:
    - tags-event.html
    - tags-listens.html
---

## Syntax

`@fires <className>#[event:]<eventName>`


## Overview

The @fires tag indicates that a method can fire a specified type of event when it is called. Use the
[@event tag][event-tag] to document the event's content.

[event-tag]: tags-event.html


## Examples

{% example "Method that fires a 'drain' event" %}

```js
/**
 * Drink the milkshake.
 *
 * @fires Milkshake#drain
 */
Milkshake.prototype.drink = function() {
    // ...
};
```
{% endexample %}
