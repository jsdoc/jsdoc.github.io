---
tag: async
description: Indicate that a function is asynchronous.
---

## Syntax

`@async`


## Overview

The `@async` tag indicates that a function is [asynchronous][async-function], meaning that it
was declared using the syntax `async function foo() {}`. Do not use this tag for other types of
asynchronous functions, such as functions that provide a callback. This tag is available in JSDoc
3.5.0 and later.

In general, you do not need to use this tag, because JSDoc automatically detects asynchronous
functions and identifies them in the generated documentation. However, if you are writing a virtual
comment for an asynchronous function that does not appear in your code, you can use this tag to
tell JSDoc that the function is asynchronous.

[async-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function


## Example

The following example shows a virtual comment that uses the `@async` tag:

{% example "Virtual comment with @async tag" %}

```js
/**
 * Download data from the specified URL.
 *
 * @async
 * @function downloadData
 * @param {string} url - The URL to download from.
 * @return {Promise&lt;string>} The data from the URL.
 */
```

{% endexample %}
