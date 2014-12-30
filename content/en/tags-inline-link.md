---
inlineTag: link
description: Link to another item in the documentation.
version: '>=3.0.0'
synonyms:
    - linkcode
    - linkplain
related:
    - about-configuring-jsdoc.html
    - about-namepaths.html
---

## Syntax

    {@link namepathOrURL}
    [link text]{@link namepathOrURL}
    {@link namepathOrURL|link text}
    {@link namepathOrURL link text (after the first space)}


## Overview

The `{@link}` inline tag creates a link to the namepath or URL that you specify. When you use the
`{@link}` tag, you can also provide link text, using one of several different formats. If you don't
provide any link text, JSDoc uses the namepath or URL as the link text.

If you need to link to a tutorial, use the [`{@tutorial}` inline tag][tutorial-inline-tag] instead
of the `{@link}` tag.

[tutorial-inline-tag]: tags-inline-tutorial.html


## Link formatting

By default, `{@link}` generates standard HTML anchor tags. However, you may prefer to render certain
links in a monospace font, or to specify the format of individual links. You can use the following
synonyms for the `{@link}` tag to control the formatting of links:

+ `{@linkcode}`: Forces the link's text to use a monospace font.
+ `{@linkplain}`: Forces the link's text to appear as normal text, without a monospace font.

You can also set one of the following options in JSDoc's configuration file; see
[Configuring JSDoc][configuring] for more details:

+ `templates.cleverLinks`: When set to `true`, links to URLs use normal text, and links to code use
a monospace font.
+ `templates.monospaceLinks`: When set to `true`, all links use a monospace font, except for links
created with the `{@linkplain}` tag.

**Note**: Although the default JSDoc template renders all of these tags correctly, other templates
may not recognize the `{@linkcode}` and `{@linkplain}` tags. In addition, other templates may ignore
the configuration options for link rendering.

[configuring]: about-configuring-jsdoc.html


## Examples

The following example shows all of the ways to provide link text for the `{@link}` tag:

{% example "Providing link text" %}

```js
/**
 * See {@link MyClass} and [MyClass's foo property]{@link MyClass#foo}.
 * Also, check out {@link http://www.google.com|Google} and
 * {@link https://github.com GitHub}.
 */
function myFunction() {}
```
{% endexample %}

By default, the example above produces output similar to the following:

{% example "Output for {@link} tags" %}

```html
See &lt;a href="MyClass.html">MyClass&lt;/a> and &lt;a href="MyClass.html#foo">MyClass's foo
property&lt;/a>. Also, check out &lt;a href="http://www.google.com">Google&lt;/a> and
&lt;a href="https://github.com">GitHub&lt;/a>.
```
{% endexample %}

If the configuration property `templates.cleverLinks` were set to `true`, the example above would
produce the following output:

{% example "Output with clever links enabled" %}

```html
See &lt;a href="MyClass.html">&lt;code>MyClass&lt;/code>&lt;/a> and &lt;a href="MyClass.html#foo">
&lt;code>MyClass's foo property&lt;/code>&lt;/a>. Also, check out
&lt;a href="http://www.google.com">Google&lt;/a> and &lt;a href="https://github.com">GitHub&lt;/a>.
```
{% endexample %}
