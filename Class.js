/*  JavaScript Class Implementation
 *  By Derek Leung
 *  2014/8/22
 *  
 *  Provides a simple method of constructing classes with inheritance,
 *  nonstatic and static methods/variables via ultitizing JavaScript's
 *  native prototype inheritance. Super method is available when a
 *  method is called.
 *
 *  Example:
 *  var ClassA = Class.create({
 *      init: function(value){
 *          this.value = value;
 *      },
 *      print: fuction(){
 *          console.log(this.value);
 *      }
 *  }), ClassB = ClassA.extends({
 *      init: function(value){
 *          this._super(value);
 *      }
 *  }),
 *  objA = new ClassA(1), objB = new ClassB(2);
 *
 *  objB instanceof ClassA;                      //true
 *  objA instanceof ClassB;                      //false
 *  !!objA.print;                                //true
 *  !!objB.print;                                //true
 */

(function(){
    var env = this, initializing = false, originalClass = env.Class,
    defaultInit = function(){
        var superInit = this._super;
        if(superInit) superInit.apply(this, arguments);
    },
    Class = function(){
        throw new TypeError("Illegal constructor");
    };

    Class.extends = function(props, Parent){
        var constructor; Parent = typeof Parent == "undefined" ? this : Parent;

        if(arguments.length < 1 || Object.prototype.toString.call(props) !== "[object Object]") throw new TypeError("Invalid parameters");
        if(typeof props.init === "undefined") props.init = defaultInit;

        initializing = true;
        var prototype = Object.create(Parent === null ? null : Parent.prototype);
        initializing = false;
        constructor = function(){
            if(!(this instanceof constructor)) throw new TypeError("Constructor cannot be called as a function");
            this._super = function(){
                return Parent.apply(this, arguments);
            };
            initializing || props.init.apply(this, arguments);
            delete this._super;
        };
        constructor.prototype = prototype;
        Object.defineProperty(constructor.prototype, "constructor", {enumerable: false, value: constructor});
        for(var prop in props){
            if(!props.hasOwnProperty(prop)) continue;
            if(prop === "static"){
                for(var staticProp in props[prop]){
                    if(!props[prop].hasOwnProperty(staticProp)) continue;
                    constructor[staticProp] = props[prop][staticProp];
                }
            } else if(prop === "init"){
            } else if(typeof props[prop] === "function"){
                constructor.prototype[prop] = createAccessMethod(Parent, props, prop);
            } else {
                constructor.prototype[prop] = props[prop];
            }
        }
        constructor.extends = Class.extends;
        return constructor;
    };

    function createAccessMethod(Parent, props, prop){
        return function(){
            this._super = function(){
                if(!Parent) throw new ReferenceError("Super class does not exist");
                var superMethod = Parent.prototype[prop];
                if(!superMethod) throw new ReferenceError("Method \"" + prop + "\" does not exist in super class");
                return superMethod.apply(this, arguments);
            };
            var rtn = props[prop].apply(this, arguments);
            delete this._super;
            return rtn;
        };
    }

    Class.create = function(props){
        return Class.extends(props, null);  
    };

    Class.noConflict = function(){
        env.Class = originalClass;
        return Class;
    };

    env.Class = Class;
})();