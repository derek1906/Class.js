# Class.js
A JavaScript Class Implementation

Provides a simple method of constructing classes with inheritance, nonstatic and static methods/variables via ultitizing JavaScript's native prototype inheritance. Super method is available when a
method is called.

##Example
````
var ClassA = Class.create({
    init: function(value){
        this.value = value;
    },
    print: fuction(){
        console.log(this.value);
    }
}), ClassB = ClassA.extends({
    init: function(value){
        this._super(value);
    }
}),
objA = new ClassA(1), objB = new ClassB(2);

objB instanceof ClassA;                      //true
objA instanceof ClassB;                      //false
!!objA.print;                                //true
!!objB.print;                                //true
````