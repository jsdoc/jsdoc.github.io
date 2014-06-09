{% extends 'layout.swig' %}

{% macro tocItems(items) %}
    {% for item in items %}
        {% if item.filename %}
            {% set itemLink = item.filename %}
            {% set itemText = titleForFilename(files, item.filename) %}
            {% set itemDescription = descriptionForFilename(files, item.filename) %}
        {% else %}
            {% set itemLink = item.link %}
            {% set itemText = item.text %}
            {% set itemDescription = item.description %}
        {% endif %}

        {% if item.synonyms %}
            {% set itemExtraText = ' (synonyms: ' + item.synonyms.join(', ') + ')' %}
        {% else %}
            {% set itemExtraText = '' %}
        {% endif %}
        <dt><a href="{{ itemLink }}">{{ itemText }}</a>{{ itemExtraText }}</dt>
        <dd>{{ itemDescription }}</dd>
    {% endfor %}
{% endmacro %}

{% block content %}
    <h2>Getting Started</h2>
    <dl>
        {{ tocItems(metadata.tocData.gettingStarted) }}
    </dl>

    <h2>JSDoc Examples</h2>
    <dl>
        {{ tocItems(metadata.tocData.examples) }}
    </dl>

    <h2>Contribute</h2>
    <dl>
        {{ tocItems(metadata.tocData.contribute) }}
    </dl>

    <h2 id="tag-dictionary">Tag Dictionary</h2>
    <dl>
        {% set tags = getTagObjects(files, metadata) %}
        {{ tocItems(tags) }}
    </dl>

    <p>
        <a href="https://github.com/jsdoc3/jsdoc" class="github-ribbon">Fork me on GitHub</a>
    </p>
{% endblock %}
