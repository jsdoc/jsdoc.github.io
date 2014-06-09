---
tag: inner
description: Document an inner object.
related:
    - tags-global.html
    - tags-instance.html
    - tags-static.html
---

## Overview

Using the @inner tag will mark a symbol as an inner member of its parent symbol. This means it can
be referred to by "Parent~Child".

Using @inner will override a doclet's default scope (unless it is in the global scope, in which case
it will remain global).


## Examples

{% example "Using @inner to make a virtual doclet an inner member" %}

```js
/** @namespace MyNamespace */
/**
 * myFunction is now MyNamespace~myFunction.
 * @function myFunction
 * @memberof MyNamespace
 * @inner
 */
```
{% endexample %}

Note that in the above we could have used "@function MyNamespace~myFunction" instead of the
@memberof and @inner tags.

{% example "Using @inner" %}

```js
/** @namespace */
var MyNamespace = {
    /**
     * foo is now MyNamespace~foo rather than MyNamespace.foo.
     * @inner
     */
    foo: 1
};
```
{% endexample %}

In the above example, we use @inner to force a member of a namespace to be documented as an inner
member (by default, it would be a static member). This means that `foo` now has the longname
`MyNamespace~foo` instead of `MyNamespace.foo`.
