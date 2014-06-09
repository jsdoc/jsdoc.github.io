---
tag: access
description: Specify the access level of this member (private, public, or protected).
related:
    - tags-global.html
    - tags-instance.html
    - tags-private.html
    - tags-protected.html
    - tags-public.html
    - tags-static.html
---

## Syntax

`@access <private|protected|public>`


## Overview

The @access tag specifies the access level of a member. Note that "@access private" is the same as "@private", "@access protected" is the same as "@protected", and "@access public" is the same as "@public" which is the same as not including the tag at all. Private members will not show in the output documentation unless JSDoc is given the `--private` option.

Note that a doclet's _access level_ is different from its _scope_. For example, if "Parent" has an inner variable "child" that is documented as @public, "child" will still be treated as an inner variable with the namepath "Parent~child".
To change a doclet's scope, see the [@instance][instance-tag], [@static][static-tag], and [@global][global-tag] tags.

[global-tag]: tags-global.html
[instance-tag]: tags-instance.html
[static-tag]: tags-static.html


## Examples

{% example "@access is a synonym for @private, @protected, @public." %}

```js
/** @constructor */
function Thingy() {

    /** @access private */
    var foo = 0;

    /** @access protected */
    this._bar = 1;

    /** @access public */
    this.pez = 2;

}

// same as...

/** @constructor */
function OtherThingy() {

    /** @private */
    var foo = 0;

    /** @protected */
    this._bar = 1;

    /** @public */
    this.pez = 2;

}
```
{% endexample %}
