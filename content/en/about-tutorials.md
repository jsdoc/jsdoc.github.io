---
title: Tutorials
description: Adding tutorials to your API documentation.
---

JSDoc allows you to include tutorials alongside your API documentation. You can use this feature to
provide detailed instructions for using your API, such as a "getting started" guide or a
step-by-step process for implementing a feature.


## Adding tutorials

To add tutorials to your API documentation, run JSDoc with the `--tutorials` or `-u` option, and
provide a directory that JSDoc should search for tutorials. For example:

    jsdoc -u path/to/tutorials path/to/js/files

JSDoc searches the tutorials directory for files with the following extensions:

+ `.htm`
+ `.html`
+ `.markdown` (converted from Markdown to HTML)
+ `.md` (converted from Markdown to HTML)
+ `.xhtml`
+ `.xml` (treated as HTML)

JSDoc also searches for JSON files that contain information about the titles, ordering, and
hierarchy of your tutorials, as discussed in the following section.

JSDoc assigns an identifier to each tutorial. The identifier is the filename without its extension.
For example, the identifier for `/path/to/tutorials/overview.md` is `overview`.

In tutorial files, you can use the [`{@link}`][link-inline-tag] and
[`{@tutorial}`][tutorial-inline-tag] inline tags to link to other parts of the documentation. JSDoc
will automatically resolve the links.

[link-inline-tag]: tags-inline-link.html
[tutorial-inline-tag]: tags-inline-tutorial.html


## Configuring titles, order, and hierarchy

By default, JSDoc uses the filename as the tutorial's title, and all tutorials are at the same
level. You can use a JSON file to provide a title for each tutorial and indicates how the tutorials
should be sorted and grouped in the documentation.

The JSON file must use the extension `.json`. In the JSON file, you can use the tutorial identifiers
to provide two properties for each tutorial:

+ `title`: The title to display in the documentation.
+ `children`: The children of the tutorial.

In JSDoc 3.2.0 and later, you can use the following formats for the JSON file:

1. A tree of objects, with child tutorials defined in the `children` property of their parent.
For example, if `tutorial1` has two children, `childA` and `childB`, and `tutorial2` is at the same
level as `tutorial1` and has no children:

    ```json
    {
        "tutorial1": {
            "title": "Tutorial One",
            "children": {
                "childA": {
                    "title": "Child A"
                },
                "childB": {
                    "title": "Child B"
                }
            }
        },
        "tutorial2": {
            "title": "Tutorial Two"
        }
    }
    ```

2. A top-level object whose properties are all tutorial objects, with child tutorials listed by name
in an array. For example, if `tutorial1` has two children, `childA` and `childB`, and `tutorial2` is
at the same level as `tutorial1` and has no children:

    ```json
    {
        "tutorial1": {
            "title": "Tutorial One",
            "children": ["childA", "childB"]
        },
        "tutorial2": {
            "title": "Tutorial Two"
        },
        "childA": {
            "title": "Child A"
        },
        "childB": {
            "title": "Child B"
        }
    }
    ```

You can also provide an individual `.json` file for each tutorial, using the tutorial identifier as
the filename. This method is deprecated and should not be used for new projects.


## Linking to tutorials from API documentation

There are multiple ways to link to a tutorial from your API documentation:

### @tutorial block tag

If you include a [`@tutorial` block tag][tutorial-block-tag] in a JSDoc comment, the generated documentation
will include a link to the tutorial you specify.

{% example "Using the `@tutorial` block tag" %}


```js
/**
 * Class representing a socket connection.
 *
 * @class
 * @tutorial socket-tutorial
 */
function Socket() {}
```
{% endexample %}

### {@tutorial} inline tag

You can also use the [`{@tutorial}` inline tag][tutorial-inline-tag] to link to a tutorial within the text
of another tag. By default, JSDoc will use the tutorial's title as the link text.

{% example "Using the `{@tutorial}` inline tag" %}

```js
/**
 * Class representing a socket connection. See {@tutorial socket-tutorial}
 * for an overview.
 *
 * @class
 */
function Socket() {}
```
{% endexample %}

[tutorial-block-tag]: tags-tutorial.html
[tutorial-inline-tag]: tags-inline-tutorial.html
