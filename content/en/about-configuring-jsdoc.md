---
title: Configuring JSDoc with a configuration file
description: How to configure JSDoc using a configuration file.
related:
    - about-commandline.html
    - about-plugins.html
    - plugins-markdown.html
---

## Configuration file formats

To customize JSDoc's behavior, you can provide a configuration file to JSDoc in one of the following
formats:

+ A JSON file. In JSDoc 3.3.0 and later, this file may include comments.
+ A CommonJS module that exports a single configuration object. This format is supported in JSDoc
3.5.0 and later.

To run JSDoc with a configuration file, use the [`-c` command-line option][about-commandline] (for
example, `jsdoc -c /path/to/conf.json` or `jsdoc -c /path/to/conf.js`).

The following examples show a simple configuration file that enables JSDoc's [Markdown
plugin][markdown]. JSDoc's configuration options are explained in detail in the following sections.

{% example "JSON configuration file" %}

```js
{
    "plugins": ["plugins/markdown"]
}
```

{% endexample %}

{% example "JavaScript configuration file" %}

```js
'use strict';

module.exports = {
    plugins: ['plugins/markdown']
};
```

{% endexample %}

For a more comprehensive example of a JSON configuration file, see the file
[`conf.json.EXAMPLE`][conf-json-example].

[about-commandline]: about-commandline.html
[conf-json-example]: https://github.com/jsdoc3/jsdoc/blob/master/conf.json.EXAMPLE
[markdown]: plugins-markdown.html


## Default configuration options

If you do not specify a configuration file, JSDoc uses the following configuration options:

{% example %}
```js
{
    "plugins": [],
    "recurseDepth": 10,
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "sourceType": "module",
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    },
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```
{% endexample %}

This means:

+ No plugins are loaded (`plugins`).
+ If recursion is enabled with the [`-r` command-line flag][about-commandline], JSDoc will search
for files 10 levels deep (`recurseDepth`).
+ Only files ending in `.js`, `.jsdoc`, and `.jsx` will be processed (`source.includePattern`).
+ Any file starting with an underscore, or in a directory starting with an underscore, will be
ignored (`source.excludePattern`).
+ JSDoc supports code that uses [ES2015 modules][es2015-modules] (`sourceType`).
+ JSDoc allows you to use unrecognized tags (`tags.allowUnknownTags`).
+ Both standard JSDoc tags and [Closure Compiler tags][closure-tags] are enabled
(`tags.dictionaries`).
+ [Inline `{@link}` tags][tags-inline-link] are rendered in plain text (`templates.cleverLinks`,
`templates.monospaceLinks`).

These options and others are explained in the following sections.

[about-commandline]: about-commandline.html
[closure-tags]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#jsdoc-tags
[es2015-modules]: howto-es2015-modules.html
[tags-inline-link]: tags-inline-link.html


## Configuring plugins

To enable plugins, add their paths (relative to the JSDoc folder) into the `plugins` array.

For example, the following JSON configuration file will enable the Markdown plugin, which converts
Markdown-formatted text to HTML, and the "summarize" plugin, which autogenerates a summary for each
doclet:

{% example "JSON configuration file with plugins" %}

```
{
    "plugins": [
        "plugins/markdown",
        "plugins/summarize"
    ]
}
```
{% endexample %}

See the [plugin reference][plugins] for further information, and look in [JSDoc's `plugins`
directory][jsdoc-plugins] for the plugins built into JSDoc.

You can configure the Markdown plugin by adding a `markdown` object to your configuration file. See
[Configuring the Markdown Plugin][markdown] for details.

[jsdoc-plugins]: https://github.com/jsdoc3/jsdoc/tree/master/plugins
[markdown]: plugins-markdown.html
[plugins]: about-plugins.html


## Specifying recursion depth

The `recurseDepth` option controls how many levels deep JSDoc will recursively search for source
files and tutorials. This option is available in JSDoc 3.5.0 and later. This option is used only if
you also specify the [`-r` command-line flag][about-commandline], which tells JSDoc to recursively
search for input files.

{% example %}

```js
{
    "recurseDepth": 10
}
```
{% endexample %}

[about-commandline]: about-commandline.html


## Specifying input files

The `source` set of options, in combination with paths given to JSDoc on the command line,
determines the set of input files that JSDoc uses to generate documentation.

{% example %}

```js
{
    "source": {
        "include": [ /* array of paths to files to generate documentation for */ ],
        "exclude": [ /* array of paths to exclude */ ],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    }
}
```
{% endexample %}

+ `source.include`: An optional array of paths that contain files for which JSDoc should generate
documentation. The paths given to JSDoc on the command line are combined with these paths. You can
use the [`-r` command-line option][about-commandline] to recurse into subdirectories.
+ `source.exclude`: An optional array of paths that JSDoc should ignore. In JSDoc 3.3.0 and later,
this array may include subdirectories of the paths in `source.include`.
+ `source.includePattern`: An optional string, interpreted as a regular expression. If present, all
filenames must match this regular expression to be processed by JSDoc. By default, this option is
set to ".+&#92;.js(doc|x)?$", meaning that only files with the extensions `.js`, `.jsdoc`, and
`.jsx` will be processed.
+ `source.excludePattern`: An optional string, interpreted as a regular expression. If present, any
file matching this regular expression will be ignored. By default, this option is set so that files
beginning with an underscore (or anything under a directory beginning with an underscore) is
ignored.

These options are interpreted in the following order:

1. Start with all paths given on the command line and in `source.include`.
2. For each file found in Step 1, if the regular expression `source.includePattern` is present, the
filename must match it, or it is ignored.
3. For each file left from Step 2, if the regular expression `source.excludePattern` is present, any
filename matching this regular expression is ignored.
4. For each file left from Step 3, if the file's path is in `source.exclude`, it is ignored.

All remaining files after these four steps are processed by JSDoc.

As an example, suppose you have the following file structure:

{% example %}

```
myProject/
|- a.js
|- b.js
|- c.js
|- _private
|  |- a.js
|- lib/
   |- a.js
   |- ignore.js
   |- d.txt
```
{% endexample %}

In addition, suppose your `conf.json` file looks like this example:

{% example %}

```js
{
    "source": {
        "include": ["myProject/a.js", "myProject/lib", "myProject/_private"],
        "exclude": ["myProject/lib/ignore.js"],
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    }
}
```
{% endexample %}

If you run `jsdoc myProject/c.js -c /path/to/my/conf.json -r` from the file containing the
`myProject` folder, JSDoc will generate documentation for the following files:

+ `myProject/a.js`
+ `myProject/c.js`
+ `myProject/lib/a.js`

Here's why:

1. Given `source.include` and the paths given on the command line, JSDoc starts off with these
files:
    + `myProject/c.js` (from the command line)
    + `myProject/a.js` (from `source.include`)
    + `myProject/lib/a.js`, `myProject/lib/ignore.js`, `myProject/lib/d.txt` (from `source.include`
    and using the `-r` option)
    + `myProject/_private/a.js` (from `source.include`)
2. JSDoc applies `source.includePattern`, leaving us with all of the above files _except_
`myProject/lib/d.txt`, which does not end in `.js`, `.jsdoc`, or `.jsx`.
3. JSDoc applies `source.excludePattern`, which removes `myProject/_private/a.js`.
4. JSDoc applies `source.exclude`, which removes `myProject/lib/ignore.js`.

[about-commandline]: about-commandline.html


## Specifying the source type

The `sourceType` option affects how JSDoc parses your JavaScript files. This option is available in
JSDoc 3.5.0 and later. This option accepts the following values:

+ `module` (default): Use this value for most types of JavaScript files.
+ `script`: Use this value if JSDoc logs errors such as `Delete of an unqualified identifier in
strict mode` when it parses your code.

{% example %}

```js
{
    "sourceType": "module"
}
```
{% endexample %}


## Incorporating command-line options into the configuration file

You can put many of JSDoc's [command-line options][options] into the configuration file instead of
specifying them on the command line. To do this, add the long names of the relevant options into an
`opts` section of the configuration file, with the value set to the option's value.

[options]: about-commandline.html

{% example "JSON configuration file with command-line options" %}

```js
{
    "opts": {
        "template": "templates/default",  // same as -t templates/default
        "encoding": "utf8",               // same as -e utf8
        "destination": "./out/",          // same as -d ./out/
        "recurse": true,                  // same as -r
        "tutorials": "path/to/tutorials", // same as -u path/to/tutorials
    }
}
```
{% endexample %}

By using the `source.include` and `opts` options, you can put almost all of the arguments to JSDoc
in a configuration file, so that the command line reduces to:

```
jsdoc -c /path/to/conf.json
```

When options are specified on the command line _and_ in the configuration file, the command line
takes precedence.


## Configuring tags and tag dictionaries

The options in `tags` control which JSDoc tags are allowed and how each tag is interpreted.

{% example %}

```js
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc","closure"]
    }
}
```
{% endexample %}

The `tags.allowUnknownTags` property affects how JSDoc handles unrecognized tags. If you set this
option to `false`, and JSDoc finds a tag that it does not recognize (for example, `@foo`), JSDoc
logs a warning. By default, this option is set to `true`. In JSDoc 3.4.1 and later, you can also
set this property to an array of tag names that JSDoc should allow (for example, `["foo","bar"]`).

The `tags.dictionaries` property controls which tags JSDoc recognizes, as well as how JSDoc
interprets the tags that it recognizes. In JSDoc 3.3.0 and later, there are two built-in tag
dictionaries:

+ `jsdoc`: Core JSDoc tags.
+ `closure`: [Closure Compiler tags][closure-tags].

By default, both dictionaries are enabled. Also, by default, the `jsdoc` dictionary is listed first;
as a result, if the `jsdoc` dictionary handles a tag differently than the `closure` dictionary, the
`jsdoc` version of the tag takes precedence.

If you are using JSDoc with a Closure Compiler project, and you want to avoid using tags that
Closure Compiler does not recognize, change the `tags.dictionaries` setting to `["closure"]`. You
can also change this setting to `["closure","jsdoc"]` if you want to allow core JSDoc tags, but you
want to ensure that Closure Compiler-specific tags are interpreted as Closure Compiler would
interpret them.

[closure-tags]: https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler#jsdoc-tags


## Configuring templates

The options in `templates` affect the appearance and content of generated documentation. Third-party
templates may not implement all of these options. See [Configuring JSDoc's Default
Template][default-template] for additional options that the default template supports.

{% example %}

```js
{
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false
    }
}
```
{% endexample %}

If `templates.monospaceLinks` is true, all link text from the [inline `{@link}`
tag][inline-link-tag] will be rendered in monospace.

If `templates.cleverLinks` is true, `{@link asdf}` will be rendered in normal font if `asdf` is a
URL, and monospace otherwise. For example, `{@link http://github.com}` will render in plain text,
but `{@link MyNamespace.myFunction}` will be in monospace.

If `templates.cleverLinks` is true, `templates.monospaceLinks` is ignored.

[default-template]: about-configuring-default-template.html
[inline-link-tag]: tags-inline-link.html
