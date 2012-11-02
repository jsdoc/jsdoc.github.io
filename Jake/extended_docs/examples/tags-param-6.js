/**
 * Returns the sum of all numbers passed to the function.
 * @param {...Number} num A positive or negative number
 */
function sum(num) {
    var i=0, n=arguments.length, t=0;
    for (; i&lt;n; i++) {
        t += arguments[i];
    }
    return t;
}
