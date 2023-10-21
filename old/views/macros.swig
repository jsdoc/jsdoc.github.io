{% macro tocList(items) %}
    <ul>
        {% for item in items %}
            <li>
                <a href="#{{ item.id }}">{{ item.text }}</a>
                {% if item.children.length %}
                    {{ toc(item.children, true) }}
                {% endif %}
            </li>
        {% endfor %}
    </ul>
{% endmacro %}

{% macro toc(items, isInner) %}
    {% if !isInner %}
        <h2>Table of Contents</h2>
    {% endif %}
    {{ tocList(items) }}
{% endmacro %}
