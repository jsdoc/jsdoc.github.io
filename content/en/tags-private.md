---
tag: private
description: This symbol is meant to be private.
related:
    - tags-access.html
    - tags-instance.html
    - tags-protected.html
    - tags-public.html
    - tags-static.html
    - tags-global.html
---

## Overview

The @private tag marks a symbol as private, or not meant for general use. Private members are not
shown in the generated output unless JSDoc is run with the `-p` or `--private` switch.

The @private tag is not inherited by child members. For example, if the @private tag is added to a
namespace, members of the namespace can still appear in the generated output; because the namespace
is private, the members' namepath will not include the namespace.

The @private tag is equivalent to "@access private". See [@access][access-tag] for details about the
@access tag.

[access-tag]: tags-access.html


## Examples

In the following example, `Documents` and `Documents.Newspaper` appear in the generated
documentation, but not `Documents.Diary`.

{% example "Using the @private tag" %}

```js
/** @namespace */
var Documents = {
    /**
     * An ordinary newspaper.
     */
    Newspaper: 1,
    /**
     * My diary.
     * @private
     */
    Diary: 2
};
```
{% endexample %}
