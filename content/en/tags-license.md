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

Some JavaScript processing tools, such as Google's Closure Compiler, will automatically preserve
any JSDoc comment that includes a `@license` tag. If you are using one of these tools, you may wish
to add a standalone JSDoc comment that includes the `@license` tag, along with the entire text of
the license, so that the license text will be included in generated JavaScript files.

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

{% example "A standalone JSDoc comment with the complete MIT license" %}

```js
/**
 * @license
 * Copyright (c) 2015 Example Corporation Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
```

{% endexample %}
