---
title: Tutorials mechanism
description: Additional longtext tutorials for your code.
---

Tutorials mechanism allows you to include not only short code-related technical API documentation, but also longer, more explaining, full-page tutorials. It's a bit similar to phpDocumentor's one.

With `-u` option you can specify a directory, which JSDoc will search for tutorials. It will treat any file with extension .xml, .xhtml, .html and .htm as tutorial content files. Also .md and .markdown extensions are supported and will be additionally parsed as Markdown and converted to HTML.

By default each tutorial is top-level. Top-level tutorials are listed in navigation menu.

## Configuration

Each tutorial file can have additional .js/.json file (with same name, just different extension) which will hold additional tutorial configuration. Two fields are supported:

+ `title` overrides display name for tutorial with the one specified in it's value (default title for tutorial is it's filename).
+ `children` which holds list of sub-tutorials identifiers.

When tutorial has `children` property set, it's children will be listed in it's _ToC_ as sub-articles instead of top-level navigation menu.

## Identifiers

Tutorial is identified by it's filename (eg. `test.html` is named `test`). No matter to what you will change tutorial's title, it's identifier will be just `test`. Title is for displaying, name is for identifying. This allows you to link to tutorial without depending on it's variable display name.

### @tutorial tag

Doclets can have assigned tutorials (similar to `@link` and `@see` tags) through @tutorial tag:

{% example "Example of the @tutorial tag" %}

```js
/** * Description.
 *
 * @class
 * @tutorial test-tutorial
 */
```
{% endexample %}

@tutorial tag can also be handled in-line in descriptions:

{% example "Using the tutorial tag in a description" %}

```js
/**
 * Description {@tutorial test-tutorial}.
 *
 * @class
 */
```
{% endexample %}

## Tutorial content

Tutorial content is processed with `resolveLinks()`, which means you can use both `{@link}` and `{@tutorial}` tags within tutorial text! They will be processed just like doclets descriptions.

{% example "Using the @tutorial tag in content" %}

```html
&lt;p>This is tutorial content. See {@link Class.create} for OOP info and {@tutorial class-create} tutorial.&lt;/p>
```
{% endexample %}

## Backward compatibility

It is purely additional feature - if one won't specify `-u` option it won't affect documentation building. Also template `publish()` method is not a problem, since tutorials are passed as last argument, so if template function is not prepared for tutorials it just won't process them.
