---
tag: callback
description: Document a callback function.
related:
    - tags-function.html
    - tags-typedef.html
---

## Syntax

`@callback <namepath>`


## Overview

The @callback tag provides information about a callback function that can be passed to other
functions, including the callback's parameters and return value. You can include any of the tags
that you can provide for a @method.

Once you define a callback, you can use it in the same way as a custom type defined with the
@typedef tag. In particular, you can use the callback's name as a type name. This allows you to
indicate that a function parameter should contain a certain type of callback.

If you want a callback to be displayed with the type definitions for a specific class, you can give
the callback a namepath indicating that it is an inner function of that class. You can also define a
global callback type that is referenced from multiple classes.


## Examples

{% example "Documenting a class-specific callback" %}

```js
/**
 * @class
 */
function Requester() {}

/**
 * Send a request.
 * @param {Requester~requestCallback} cb - The callback that handles the response.
 */
Requester.prototype.send = function(cb) {
    // code
};

/**
 * This callback is displayed as part of the Requester class.
 * @callback Requester~requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
```
{% endexample %}

{% example "Documenting a global callback" %}

```js
/**
 * @class
 */
function Requester() {}

/**
 * Send a request.
 * @param {requestCallback} cb - The callback that handles the response.
 */
Requester.prototype.send = function(cb) {
    // code
};

/**
 * This callback is displayed as a global member.
 * @callback requestCallback
 * @param {number} responseCode
 * @param {string} responseMessage
 */
```
{% endexample %}
