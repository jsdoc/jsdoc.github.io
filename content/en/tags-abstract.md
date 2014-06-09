---
tag: abstract
description: This member must be implemented (or overridden) by the inheritor.
synonyms:
    - virtual
---

## Overview

The @abstract tag identifies members that must be implemented (or overridden) by objects that
inherit the member.

## Example

{% example "Parent class with abstract method, and child class that implements the method" %}

```js
/**
 * Generic dairy product.
 * @constructor
 */
function DairyProduct() {}

/**
 * Check whether the dairy product is solid at room temperature.
 * @abstract
 * @return {boolean}
 */
DairyProduct.prototype.isSolid = function() {
    throw new Error('must be implemented by subclass!');
};

/**
 * Cool, refreshing milk.
 * @constructor
 * @augments DairyProduct
 */
function Milk() {}

/**
 * Check whether milk is solid at room temperature.
 * @return {boolean} Always returns false.
 */
Milk.prototype.isSolid = function() {
    return false;
};
```
{% endexample %}
