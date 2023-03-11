---
tag: typedef
description: Document a custom type.
related:
    - tags-callback.html
    - tags-param.html
    - tags-type.html
---

## Syntax

`@typedef [<type>] <namepath>`


## Overview

The @typedef tag is useful for documenting custom types, particularly if you wish to refer to them
repeatedly. These types can then be used within other tags expecting a type, such as
[@type][type-tag] or [@param][param-tag].

Use the [@callback][callback-tag] tag to document the type of callback functions.

[callback-tag]: tags-callback
[param-tag]: tags-param
[type-tag]: tags-type


## Examples

This example defines a union type for parameters that can contain either numbers or strings that
represent numbers.

- **Using the @typedef tag**

```js
/**
 * A number, or a string containing a number.
 * @typedef {(number|string)} NumberLike
 */

/**
 * Set the magic number.
 * @param {NumberLike} x - The magic number.
 */
function setMagicNumber(x) {
}
```


This example defines a more complex type, an object with several properties, and sets its
namepath so it will be displayed along with the class that uses the type. Because the type
definition is not actually exposed by the class, it is customary to document the type definition as
an inner member.

- **Using @typedef to document a complex type for a class**

```js
/**
 * The complete Triforce, or one or more components of the Triforce.
 * @typedef {Object} WishGranter~Triforce
 * @property {boolean} hasCourage - Indicates whether the Courage component is present.
 * @property {boolean} hasPower - Indicates whether the Power component is present.
 * @property {boolean} hasWisdom - Indicates whether the Wisdom component is present.
 */

/**
 * A class for granting wishes, powered by the Triforce.
 * @class
 * @param {...WishGranter~Triforce} triforce - One to three {@link WishGranter~Triforce} objects
 * containing all three components of the Triforce.
 */
function WishGranter(triforce) {}
```

