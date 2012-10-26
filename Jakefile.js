/*jslint indent: 4, maxerr: 50, white: true, node: true, sloppy: true, stupid: true, plusplus:true */
/*global desc:true, task:true, Mustache:true */
// see: http://howtonode.org/intro-to-jake

desc('Building the site.');
task('default', [], function () {
    var mustacheConfig,
        templates,
        fs = require('fs'),
        outdir = './',
        srcdir = 'Jake/articles/',
        articles = [];
    
    // import the Mustache template tool
    eval(fs.readFileSync('Jake/lib/mustache.js', 'utf8'));
    
    templates = {
        head : fs.readFileSync('Jake/templates/head.mustache', 'utf8'),
        foot : fs.readFileSync('Jake/templates/foot.mustache', 'utf8'),
        article : fs.readFileSync('Jake/templates/article.mustache', 'utf8'),
        example : fs.readFileSync('Jake/templates/example.mustache', 'utf8'),
        linkList : fs.readFileSync('Jake/templates/linkList.mustache', 'utf8'),
        includes : fs.readFileSync('Jake/templates/include.mustache', 'utf8')
    };
    
    /**
     * Autogenerates a list of links from jake articles.
     * @param {String} fileNamePrefix article files beginning
     *  with this string will be linked to in this list. The
     *  metadata will be used from each file. The title is
     *  mapped to be the displayed text of the link, the out
     *  (filename) is mapped to the href of the link, and the
     *  description is mapped to the description shown below
     *  the link.
     * @returns Returns an html list of links formatted as
     *  dictionary terms and definitions.
     */
    function generateLinksList(fileNamePrefix) {
        var out = '';
        articles.forEach(function (article) {
            if (article.out.indexOf(fileNamePrefix) !== 0) {
                return '';
            }
            var location = article.out,
                text = article.title,
                description = article.description;
                
            out += Mustache.to_html(
                templates.linkList, {
                linkLocation : location,
                linkText : text,
                linkDescription : description
            });
        });
        return out;
    }
    
    /**
     * Converts end of line markers into whatever you want. 
     * Automatically detects any of \r\n, \n, or \r and 
     * replaces it with the user specified EOL marker.
     * @param {String} text The text you want processed.
     * @param {String} newEOL The replacement for the current EOL marks.
     * @returns {String} Returns the processed text.
     */
    function convertEOL(text, newEOL) {
        return text.replace(/(\r\n|\n|\r)/g, newEOL);
    }
    
    /**
     * Removes a quantity of leading spaces specified by offset.
     * @param {String} text The text to process.
     * @param {Number} offset The amount of spaces you want removed 
     * from the beginning of the text.
     * @returns Returns the processed text.
     */
    function offsetWhiteSpace(text, offset) {
        var regx;
        regx = new RegExp('^ {' + offset + '}');
        text = text.replace(regx, '');
        return text;
    }
    
    /**
     * Converts all tabs in leading whitespace into four spaces.
     * @param {String} text The text to process
     * @returns {String} Returns the processed text.
     */
    function normalizeWhiteSpacePrefix(text) {
        var prefix = text.match(/^\s*/);
        if(prefix) {
            prefix = prefix[0];
            prefix = prefix.replace(/\t/g, '    ');
            text = text.replace(/^\s*/, prefix);
        }
        return text;
    }
    
    /**
     * Counts the number of leading space or tab characters but not both.
     * @param {String} text The text to analyze.
     * @returns {Number} Returns the quantity of leading spaces or tabs.
     */
    function getOffset(text) {
        var offset = 0,
            leadingChar = text.charAt(0);
            
        if( leadingChar === ' ' || leadingChar === '\t') {
            while(text.charAt(offset) === leadingChar && offset < text.length) {
                offset++;
            }
        }
        return offset;
    }
    
    function formatExample(text) {
        // the first line of the text is the title of the example code
        var parts,
            title,
            offset,            
            code;
            
        // normalizing line endings
        text = convertEOL(text, '\n');
        
        parts = text.split('\n');
        title = parts.shift().trim();
        
        // converting any tabs in white space preceeding the line, into four spaces.
        parts = parts.map(normalizeWhiteSpacePrefix);
        
        // Since indentation in the article is directly transferred to the displayed 
        // example, we may need to remove some white space. (thinks of shift+tab).
        offset = getOffset(parts[0]);
        parts = parts.map(function(text) {
            return offsetWhiteSpace(text, offset);
        });
        
        code = parts.join('\n');
        code = code.replace(/[<]/g, '&lt;');
        
        return Mustache.to_html(
            templates.example, {
            codeTitle : title,
            codeBody : code
        });
    }
    
    /**
     * Function for including files.
     * @param {String} text The path to the file to include.
     * @returns Returns the contents of the file.
     */
    function mustacheIncluder(text) {
        var out, relPath;
        relPath = text.trim();
        try {
            out = String(fs.readFileSync(relPath));
        } catch (e) {
            console.log(e);
            out = '<p>Documentation not found at <a href="' + relPath + '"><code>' + relPath + '</code></a></p>';
        }
        
        out = Mustache.to_html(templates.includes, mustacheConfig, {includes : out});
        return out;
    }
    
    /**
     * Contains functions for handling mustache tags.
     * @namespace
     */
    mustacheConfig = {
        /**
         * Example tags are for containing code.
         * @function
         */
        example : function () {
            return function (text) {
                return formatExample(text);
            };
        },
        /**
         * Generate a link list of all
         *  articles prefixed with "tags-"
         * @function
         */
        tagRefEntry : function () {
            return function () {
                return generateLinksList('tags-');
            };
        },
        /**
         * Generate a link list of all
         *  articles prefixed with "about-"
         * @function
         */
        gettingStartedEntry : function () {
            return function () {
                return generateLinksList('about-');
            };
        },
        /**
         * Generate a link list of all
         *  articles prefixed with "plugins-"
         * @function
         */
        pluginsEntry : function () {
            return function () {
                return generateLinksList('plugins-');
            };
        },
        /**
         * Generate a link list of all
         *  articles prefixed with "howto-"
         * @function
         */
        howToEntry : function () {
            return function () {
                return generateLinksList('howto-');
            };
        },
        /**
         * Generate a link list of all
         *  articles prefixed with "contribute-"
         * @function
         */
        contributeEntry : function () {
            return function () {
                return generateLinksList('contribute-');
            };
        },
        /**
         * Includes one file in another.
         * @function
         */
        include : function () {
            return function (text) {
                return mustacheIncluder(text);
            };
        }
    };
    
    /**
     * Main mustache function
     * @param {String} article The text to run through mustache.
     * @returns {String} Returns the text as transformed by mustache.
     */
    function mainMustache(article) {
        var out, mustacheTemplateParts;
        
        mustacheTemplateParts = {
            head : templates.head,
            foot : templates.foot,
            article : article.body
        };
        mustacheConfig.title       = article.title;
        mustacheConfig.description = article.description;
        mustacheConfig.keywords    = article.keywords;
        
        out = Mustache.to_html(templates.article, mustacheConfig, mustacheTemplateParts);
        
        return out;
    }
    
    console.log('Building index...');
    fs.readdirSync(srcdir).forEach(function (file) {
        if (String(file)[0] === '.') {
            return;
        }
        
        var body = fs.readFileSync(srcdir + file, 'utf8'),
        meta = body.match(/^<!--(\{[\s\S]*\})-->/)[1];
        
        if (!meta) {
            return;
        }
        
        eval('meta = ' + meta);
        
        meta.body = body.split('}-->')[1];
        articles.push(meta);
    });
    
    console.log('Cleaning gh-pages...');
    fs.readdirSync(outdir).forEach(function (file) {
        if (/\.html$/.test(file)) {
            fs.unlinkSync(outdir + file);
            console.log('> removed ' + outdir + file);
        }
    });
    
    console.log('Building new gh-pages...');
    articles.forEach(function (article) {
        console.log('* attempting ' + article.title);
        var html = mainMustache(article);
        fs.writeFileSync(outdir + article.out, html, 'utf8');
        console.log('> created ' + outdir + article.out);
    });
    
    //console.log(sys.inspect(arguments));
});
