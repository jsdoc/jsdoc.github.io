---
tag: requires
description: This file requires a JavaScript module.
---

## Syntax

`@requires <someModuleName>`

## Overview

The @requires tag allows you to document that a module is needed to use this code. A JSDoc comment
can have multiple @require tags. The module name can be specified as "moduleName" or
"module:moduleName"; both forms will be interpreted as modules.

JSDoc does not attempt to process the module that is being included. If you want the module to be
included in the documentation, you must include the module in the list of JavaScript files to
process.


## Examples

{% example "Using the @requires tag" %}

```js
/**
 * This class requires the modules {@link module:xyzcorp/helper} and
 * {@link module:xyzcorp/helper.ShinyWidget#polish}.
 * @class
 * @requires module:xyzcorp/helper
 * @requires xyzcorp/helper.ShinyWidget#polish
 */
function Widgetizer() {}
```
{% endexample %}
