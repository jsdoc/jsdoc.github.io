---
tag: exports
description: Identify the member that is exported by a JavaScript module.
related:
    - tags-module.html
    - howto-commonjs-modules.html
    - howto-amd-modules.html
---

## Syntax

`@exports <moduleName>`

In JSDoc 3.3.0 and later, `<moduleName>` may include the `module:` prefix. In previous versions, you
must omit this prefix.


## Overview

Use the @exports tag when documenting JavaScript modules that export anything other than the
"exports" object or the "module.exports" property.


## Examples

In modules where you are using the special "exports" object, the @exports tag is never needed. JSDoc
automatically recognizes that this object's members are being exported. Similarly, JSDoc
automatically recognizes the special "module.exports" property in Node.js modules.

{% example "CommonJS module" %}

```js
/**
 * A module that says hello!
 * @module hello/world
 */

/** Say hello. */
exports.sayHello = function() {
    return 'Hello world';
};
```
{% endexample %}

{% example "Node.js module" %}

```js
/**
 * A module that shouts hello!
 * @module hello/world
 */

/** SAY HELLO. */
module.exports = function() {
    return "HELLO WORLD";
};
```
{% endexample %}

{% example "AMD module that exports an object literal" %}

```js
define(function() {

    /**
     * A module that whispers hello!
     * @module hello/world
     */
    var exports = {};

    /** say hello. */
    exports.sayHello = function() {
        return 'hello world';
    };

    return exports;
});
```
{% endexample %}

{% example "AMD module that exports a constructor" %}

```js
define(function() {
    /**
     * A module that creates greeters.
     * @module greeter
     */

    /**
     * @constructor
     * @param {string} subject - The subject to greet.
     */
    var exports = function(subject) {
        this.subject = subject || 'world';
    };

    /** Say hello to the subject. */
    exports.prototype.sayHello = function() {
        return 'Hello ' + this.subject;
    };

    return exports;
});
```
{% endexample %}

If your module exports an object named anything other than "exports" or "module.exports", use the
@exports tag to indicate what is being exported.

{% example "AMD module that exports an object" %}

```js
define(function () {

    /**
     * A module that says hello!
     * @exports hello/world
     */
    var ns = {};

    /** Say hello. */
    ns.sayHello = function() {
        return 'Hello world';
    };

    return ns;
});
```
{% endexample %}
