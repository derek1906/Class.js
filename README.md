# Class.js
A JavaScript Class Implementation

Provides a simple method of constructing classes with inheritance, nonstatic and static methods/variables via ultitizing JavaScript's native prototype inheritance. Super method is available when a
method is called.

##Example
````js
//Create a new class
var ClassA = Class.create({
	//constructor
    init: function(value){
    	//"this" can directly be used
        this.value = value;
    },
    //instance method
    print: fuction(){
        console.log(this.value);
    },
    //static methods
    static: {
		foo: function(){
			console.log("bar");
		}
	}
}), ClassB = ClassA.extends({    //ClassB inherits from ClassA
    init: function(value){
    	//._super can be used to reference a method's super function
        this._super(value);
    }
}),
objA = new ClassA(1), objB = new ClassB(2);

objB instanceof ClassA;                      //true
objA instanceof ClassB;                      //false
!!objA.print;                                //true
!!objB.print;                                //true
````

Notice that if a class is created with `.create`, then any instances of this class will not be an instance of `Object`. To inherit properly from `Object`, you will need to do:

````
var Person = Class.extends({
	init: function(){
		//...
	}
	//...
}, Object);
````