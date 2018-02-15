let _ = require('lodash');
let util = require('util');

function Observer() {
    this.observers = {}
};

Observer.prototype.on = function (name, func) {
    if(this.observers[name]){
        this.observers[name].push(func);
    }else{
        this.observers[name] = [];
        this.observers[name].push(func);
    }
};

Observer.prototype.emit = function (name) {
    if(this.observers[name]){
        _.each(this.observers[name], function (_f) {
            _f.call();
        })
    }
};
module.exports = Observer;







