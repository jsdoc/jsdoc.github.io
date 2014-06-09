---
title: Command-line arguments to JSDoc
description: About command-line arguments to JSDoc.
related:
    - about-configuring-jsdoc.html
---

At its most basic level, JSDoc is used like so:

    /path/to/jsdoc yourSourceCodeFile.js anotherSourceCodeFile.js ...

where `...` are paths to other files to generate documentation for.

Additionally, one may provide the path to a [Markdown file][md-file] (ending in ".md") or a file
named "README", and this will be added to the documentation on the front page. See [these
instructions][including-readme].

JSDoc supports a number of command-line options, many of which have both long and short forms.
Alternatively, the command-line options may be [specified in a configuration file][config-file]
given to JSDoc. The command-line options are:

Option|Description
------|-----------
`-c <value>`, `--configure <value>`|The path to a JSDoc [configuration file][config-file]. Defaults to `conf.json` or `conf.json.EXAMPLE` in the directory where JSDoc is installed.
`-d <value>`, `--destination <value>`|The path to the output folder for the generated documentation. For JSDoc's built-in Haruki template, use `console` to dump data to the console. Defaults to `./out`.
`-e <value>`, `--encoding <value>`|Assume this encoding when reading all source files. Defaults to `utf8`.
`-h`, `--help`|Display information about JSDoc's command-line options, then exit.
`-l`, `--lenient`|Try to generate documentation even if an error occurs (for example, if a tag is missing a required value). By default, if an error occurs, JSDoc exits immediately.
`--match <value>`|Only run tests whose names contain `value`.
`--nocolor`|When running tests, do not use color in the console output. On Windows, this option is enabled by default.
`-p`, `--private`|Include symbols marked with the [`@private` tag][tags-private] in the generated documentation. By default, private symbols are not included.
`-q <value>`, `--query <value>`|A query string to parse and store in the global variable `env.opts.query`. Example: `foo=bar&baz=true`.
`-r`, `--recurse`|Recurse into subdirectories when scanning for source files.
`-t <value>`, `--template <value>`|The path to the template to use for generating output. Defaults to `templates/default`, JSDoc's built-in default template.
`-T`, `--test`|Run JSDoc's test suite, and print the results to the console.
`-u <value>`, `--tutorials <value>`|Directory in which JSDoc should search for tutorials. If omitted, no tutorial pages will be generated. See the [tutorial instructions][tutorials] for more information.
`-v`, `--version`|Displays JSDoc's version number, then exits.
`--verbose`|When running tests, write the test names and descriptions to the console.
`-X`, `--explain`|Dump all doclets to the console in JSON format, then exit.


[config-file]: about-configuring-jsdoc.html
[including-readme]: about-including-readme.html
[md-file]: http://daringfireball.net/projects/markdown/
[tags-private]: tags-private.html
[tutorials]: about-tutorials.html


## Examples

Generate documentation for files in the `./src` directory, using the configuration file
`/path/to/my/conf.json`, and save the output in the `./docs` directory:

{% example %}

```
/path/to/jsdoc src -r -c /path/to/my/conf.json -d docs
```
{% endexample %}

Run all JSDoc tests whose names include the word `tag`, and log information about each test:

{% example %}

```
/path/to/jsdoc -T --match tag --verbose
```
{% endexample %}
