---
tag: variation
description: Distinguish different objects with the same name.
related:
    - tags-alias.html
    - tags-name.html
---

## Syntax

`@variation <variationNumber>`


## Overview

Sometimes your code may include multiple symbols with the same longname. For example, you might have
both a global class and a top-level namespace called `Widget`. In cases such as these, what does
"{@link Widget}" or "@memberof Widget" mean? The global namespace, or the global class?

Variations help JSDoc distinguish between different symbols with the same longname. For example, if
"@variation 2" is added to the JSDoc comment for the Widget class, "{@link Widget(2)}" will refer to
the class, and "{@link Widget}" will refer to the namespace. Alternatively, you can include the
variation when you specify the symbol's with tags such as [@alias][alias-tag] or [@name][name-tag]
(for example, "@alias Widget(2)").

You can provide any value with the @variation tag, as long as the combination of the value and the
longname results in a globally unique version of the longname. As a best practice, use a predictable
pattern for choosing the values, which will make it easier for you to document your code.

[alias-tag]: tags-alias.html
[name-tag]: tags-name.html


## Examples

The following example uses the @variation tag to distinguish between the Widget class and the Widget
namespace.

{% example "Using the @variation tag" %}

```js
/**
 * The Widget namespace.
 * @namespace Widget
 */

// you can also use '@class Widget(2)' and omit the @variation tag
/**
 * The Widget class. Defaults to the properties in {@link Widget.properties}.
 * @class
 * @variation 2
 * @param {Object} props - Name-value pairs to add to the widget.
 */
function Widget(props) {}

/**
 * Properties added by default to a new {@link Widget(2)} instance.
 */
Widget.properties = {
    /**
     * Indicates whether the widget is shiny.
     */
    shiny: true,
    /**
     * Indicates whether the widget is metallic.
     */
    metallic: true
};
```
{% endexample %}
