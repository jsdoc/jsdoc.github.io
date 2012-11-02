/**
 * Turn the data about your docs into file output.
 * @param {TAFFY} data A TaffyDB collection representing
 *                       all the symbols documented in your code.
 * @param {object} opts An object with options information.
 * @param {Tutorial} tutorialResolverRoot An object with information about included tutorials
 * @see http://www.taffydb.com/
 * @see http://www.taffydb.com/workingwithdata
 * @see http://underscorejs.org/#template
 * @see http://nodejs.org/api/fs.html
 * @see http://nodejs.org/api/path.html
 */
exports.publish = function(data, opts, tutorialResolverRoot) {
    
    // do stuff here to generate your output files
    
    console.log('-------- data() --------');
    console.log(data());
    console.log('-------- opts --------');
    console.log(opts);
    console.log('-------- tutorialResolverRoot --------');
    console.log(tutorialResolverRoot);
    console.log('-------- data().get() --------');
    console.log(data().get());

};
