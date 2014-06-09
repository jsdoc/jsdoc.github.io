'use strict';

var util = require('util');

exports.example = {
    compile: function(compiler, args, content, parents, options, blockName) {
        var caption = args.shift();

        caption = caption ? util.format('<figcaption>%s</figcaption>', caption) : '';

        return util.format('_output += "<figure>%s";\n', caption) +
            compiler(content, parents, options, blockName) +
            '_output += "</figure>";\n';
    },

    parse: function(str, line, parser, types, stack, options) {
        function handleToken(token, out) {
            if (out.length) {
                throw new Error(util.format('Unexpected token "%s" on line %s.', token.match,
                    line));
            }

            out.push(token.match);
            return true;
        }

        // handles unescaped quoted strings: {% example "foo" %}
        parser.on(types.STRING, function(token) {
            return handleToken(token, this.out);
        });

        // handles entitized quoted strings (caused by Markdown): {% example &quot;foo&quot; %}
        // only the outer entities are converted.
        parser.on(types.UNKNOWN, function(token) {
            token.match = token.match.replace(/^&quot;/, '')
                .replace(/&quot;$/, '');
            return handleToken(token, this.out);
        });

        return true;
    },
    ends: true,
    blockLevel: false
};
