// one module
define('html/utils',
    /** 
        Utility functions to ease working with DOM elements.
        @exports html/utils
     */
    function() {
        var exports = {
            /** Get the value of a property on an element. */
            getStyleProperty: function(element, propertyName) { }
        };
        
        /** Determine if an element is in the document head. */
        exports.isInHead = function(element) { }
        
        return exports;
    }
);

// another module
define('tag',
    /** @exports tag */
    function() {
        var exports = {
            /** @class */
            Tag: function(tagName) { }
        };
        
        return exports;
    }
);
