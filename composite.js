var noSuchMethod = function(methodName, args){
    this[methodName] = function(){ // create iterative function and cache it
        for(var i = 0, l = this.items.length; i != l; i++){
            var item = this.items[i];
            if(typeof item[methodName] == 'function'){
                item[methodName].apply(item, arguments);
            }
        }
    };
    this[methodName].apply(this, args);
};

var Composite = function(){
    return {
        __noSuchMethod__ : noSuchMethod,
        items : Array.prototype.slice.apply(arguments)
    };
}

/* tests

var circle = {
    draw : function(color){ console.log(color + ' circle'); }
};
var square = {
    draw : function(color){ console.log(color + ' square'); }
};
var triangle = {
    draw : function(color){ console.log(color + ' triangle'); }
};

var groupOfShapes = Composite(circle, square, triangle);
groupOfShapes.draw('red');

var ellipse = {
    draw : function(color){ console.log(color + ' ellipse'); }
};

var not_drawable = {}; // will be ignored silently

var biggerGroup = Composite(ellipse, not_drawable, groupOfShapes) // nested composite
biggerGroup.draw('green');

//*/
