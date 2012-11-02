
/**
 * Set the name.
 * @param {string} newName
 *//**
 * Get the name.
 * @returns {string}
 */
this.name = function(newName){
    if (typeof newName === 'string') {
        this._name = newName;
    }
    else {
        return this._name;
    }
}

