(function() {
    /** @global */
    var foo = 'hello foo';

    this.foo = foo;
}).apply(window);
