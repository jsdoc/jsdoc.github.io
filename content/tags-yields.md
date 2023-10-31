---
tag: yields
tags: blockTags
description: Document the value yielded by a generator function.
synonyms:
	- yield
related:
	- /tags-returns
---

## Syntax

`@yields [{type}] [description]`


## Overview

The `@yields` tag documents the value that is yielded by a generator function. This tag is available
in JSDoc 3.5.0 and later.

If you are documenting a regular function, use the [`@returns` tag][returns-tag] instead of this
tag.

[returns-tag]: /tags-returns


## Examples

::: example "@yields tag with a type"

```js
/**
 * Generate the Fibonacci sequence of numbers.
 *
 * @yields {number}
 */
function* fibonacci() {}
```
:::

::: example "@yields tag with a type and description"

```js
/**
 * Generate the Fibonacci sequence of numbers.
 *
 * @yields {number} The next number in the Fibonacci sequence.
 */
function* fibonacci() {}
```
:::
