---
tag: license
description: Identify the license that applies to this code.
---

## Syntax

`@license <identifier>`


## Overview

The `@license` tag identifies the software license that applies to any portion of your code.

You can use any text to identify the license you are using. If your code uses a standard open-source
license, consider using the appropriate identifier from the [Software Package Data Exchange (SPDX)
License List][spdx].

[spdx]: https://spdx.org/licenses/


## Examples

{% example "A module that is distributed under the Apache License 2.0" %}

```js
/**
 * Utility functions for the foo package.
 * @module foo/util
 * @license Apache-2.0
 */
```
{% endexample %}
