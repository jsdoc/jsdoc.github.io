define(function() {
     /**
        A module that creates greeters.
        @module greeter
     */
     
    /**
        @constructor
        @param {string} subject - Whom to greet.
     */
    var exports = function(subject) {
        this.subject = subject || 'world';
    }
    
    /** Say Hello. */
    exports.prototype.sayHello = function() {
        return 'Hello ' + this.subject;
    };
    
    return exports;
});
