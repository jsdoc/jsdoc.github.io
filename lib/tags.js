exports.example = {
    compile: (compiler, args, content, parents, options, blockName) => {
        let caption = args.shift() || '';
        const captionText = caption ?
            caption.replace(/"?([^"]*)"?/, '$1') :
            '';
        const captionHtml = caption ?
            `<figcaption>${captionText}</figcaption>` :
            '';

        return `_output += "<figure>${captionHtml}";\n` +
            compiler(content, parents, options, blockName) +
            '_output += "</figure>";\n';
    },

    parse: (str, line, parser, types) => {
        function handleToken(token, out) {
            if (out.length) {
                throw new Error(`Unexpected token "${token.match}" on line ${line}.`);
            }

            out.push(token.match);

            return true;
        }

        // handles unescaped quoted strings: {% example "foo" %}
        parser.on(types.STRING, token => handleToken(token, parser.out));

        // handles entitized quoted strings (caused by Markdown): {% example &quot;foo&quot; %}
        // only the outer entities are converted.
        parser.on(types.UNKNOWN, token => {
            token.match = token.match.replace(/^&quot;/, '')
                .replace(/&quot;$/, '');

            return handleToken(token, parser.out);
        });

        return true;
    },
    ends: true,
    blockLevel: false
};
