---
tag: override
description: Indicate that a symbol overrides its parent.
dictionaries:
    - closure
version: '>=3.3.0'
related:
    - tags-inheritdoc.html
---

## Overview

The `@override` tag indicates that a symbol overrides a symbol with the same name in a parent class.

This tag is provided for compatibility with [Closure Compiler][closure]. By default, JSDoc
automatically identifies symbols that override a parent.

If your JSDoc comment includes the [`@inheritdoc` tag][inheritdoc-tag], you do not need to include
the `@override` tag. The presence of the `@inheritdoc` tag implies the presence of the `@override`
tag.

[closure]: https://developers.google.com/closure/compiler/
[inheritdoc-tag]: tags-inheritdoc.html


## Example

The following example shows how to indicate that a method overrides a method in its parent class:

{% example "Method that overrides a parent" %}

```js
/**
 * @classdesc Abstract class representing a network connection.
 * @class
 */
function Connection() {}

/**
 * Open the connection.
 */
Connection.prototype.open = function() {
    // ...
};


/**
 * @classdesc Class representing a socket connection.
 * @class
 * @augments Connection
 */
function Socket() {}

/**
 * Open the socket.
 * @override
 */
Socket.prototype.open = function() {
    // ...
};
```
{% endexample %}
