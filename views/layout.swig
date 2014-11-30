{% import 'macros.swig' as macros %}

{# must be defined here so it has access to local functions #}
{% macro maybeList(items, type) %}
    {# assume multiple items #}
    {% set singleItem = false %}

    {% for item in items %}
        {% if loop.first %}
            {% if loop.last %}
                {% set singleItem = true %}
            {% else %}
                <ul>
            {% endif %}
        {% endif %}

        {% if singleItem %}
            <p>
        {% else %}
            <li>
        {% endif %}

        {% switch type %}
            {% case 'filename' %}
                <a href="{{ item }}">{{ titleForFilename(files, item) }}</a>
            {% case 'synonym' %}
                @{{ item }}
        {% endswitch %}

        {% if singleItem %}
            </p>
        {% else %}
            </li>
        {% endif %}
    {% endfor %}

    {% if !singleItem %}
        </ul>
    {% endif %}
{% endmacro %}

<!DOCTYPE html>
<!-- THIS IS A GENERATED FILE. DO NOT EDIT. -->
<html lang="en">
<head>
    {% block meta %}
        <meta charset="utf-8">
        {% if keywords %}
            <meta name="keywords" content="{{ keywords }}">
        {% endif %}
        {% if description %}
            <meta name="description" content="{{ description }}">
        {% endif %}
    {% endblock %}

    <title>Use JSDoc{% if title %}: {{ title }}{% endif %}</title>

    {% block styles %}
        <link rel="stylesheet" href="styles/usejsdoc.css">
        <link rel="stylesheet" href="styles/prettify.css">
        <link rel="stylesheet" href="styles/css3-github-ribbon.css">
    {% endblock %}

    {% block scripts-head %}
        <script src="scripts/prettify.js"></script>
        <!--[if lt IE 9]>
            <script src="scripts/html5shiv.min.js"></script>
            <script src="scripts/html5shiv-printshiv.min.js"></script>
        <![endif]-->
    {% endblock %}
</head>

<body>
    <header>
        <a href="./index.html">@use JSDoc</a>
    </header>

    <article>
    {% if title %}
        <h1>{{ title }}</h1>
    {% endif %}

    {% block toc %}
        {% if headings && renderPageToc(headings) %}
            {{ macros.toc(headings) }}
        {% endif %}
    {% endblock %}

    {% block synonyms %}
        {% if synonyms %}
            <h2 id="synonyms">Synonyms</h2>
            {{ maybeList(synonyms, 'synonym') }}
        {% endif %}
    {% endblock %}

    {% block content %}
        {{ contents|safe }}
    {% endblock %}

    {% if related %}
        <h2 id="related-links">Related Links</h2>
        {{ maybeList(related, 'filename') }}
    {% endif %}

    </article>

    <footer>
        <img alt="Creative Commons License" class="license-badge"
            src="http://i.creativecommons.org/l/by-sa/3.0/80x15.png" />
        <br>
        Copyright &#169; 2011-2014 the
        <a href="https://github.com/jsdoc3/jsdoc3.github.com/contributors">contributors</a> to the
        JSDoc 3 documentation project.
        <br>
        This website is <a href="https://github.com/jsdoc3/jsdoc3.github.com">open source</a> and is
        licensed under the <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">
        Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.
    </footer>

    {% block scripts-footer %}
        <script type="text/javascript">prettyPrint();</script>
    {% endblock %}
</body>
</html>
