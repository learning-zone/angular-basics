## TypeScript Interview Questions 



#### Q. What are the typescript features? How typescript is different from ES6?
**TypeScript** is a superset of JavaScript which primarily provides optional static typing, classes and interfaces.
Typescript is an extension of ES6. 

* TypeScript includes Interfaces, Classes, Enums, Type Inference, Generics, access modifiers, Function etc. TypeScript makes typing a bit easier and a lot less explicit by the usage of type inference.

* TypeScript supports new ECMAScript standards and compiles them to (older) ECMAScript targets of your choosing. This means that you can use features of ES2015 and beyond, like modules, lambda functions, classes, the spread operator, destructuring etc.

* With strict null checks enabled (`--strictNullChecks` compiler flag) the TypeScript compiler will not allow undefined to be assigned to a variable unless you explicitly declare it to be of nullable type.

* The TypeScript compiler can inline source map information in the generated `.js` files or create separate `.map` files. This makes it possible to set breakpoints and inspect variables during runtime directly on TypeScript code.

#### Q. How to pass optional parameter in typescript?
Optional Parameter Syntax
```typescript
function functionName(par1: number, par2?: number) {
 
}
```
Example
```typescript
function getSchool(name: string, address?: string, pinCode?: string): string {
    //...
}
 
let school = getSchool("Elementary");
let school2 = getSchool("Little Kid", "UK");  
let school3 = getSchool("Rose Tree School", "US", "99501")
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. How to declare variable so that it can hold multiple values?
**Tuples**:
It represents a heterogeneous collection of values. In other words, tuples enable storing multiple fields of different types. Tuples can also be passed as parameters to functions.

Syntax
```typescript
let tuple_name = [value1, value2, value3,… value n]
```
Example
```typescript
let employee: [number, string] = [10, "Pradeep"]; //create a  tuple 
console.log(employee[0]); // Output: 10
console.log(employee[1]); // Output: Pradeep
```

#### Q. Explain generics in TypeScript?
Generics offer a way to create reusable components. Generics provide a way to make components work with any data type and not restrict to one data type.

Example
```typescript
function getArray<T>(items : T[] ) : T[] {
    return new Array<T>().concat(items);
}

let myNumArr = getArray<number>([100, 200, 300]);
let myStrArr = getArray<string>(["Hello", "World"]);

myNumArr.push(400); // OK
myStrArr.push("Hello TypeScript"); // OK

myNumArr.push("Hi"); // Compiler Error
myStrArr.push(500); // Compiler Error
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. How to implement class constants in TypeScript?
In TypeScript, the `const` keyword cannot be used to declare class properties. Doing so causes the compiler to an error with "A class member cannot have the 'const' keyword." TypeScript 2.0 has the `readonly` modifier.

```typescript
class MyClass {
    readonly myReadonlyProperty = 1;

    myMethod() {
        console.log(this.myReadonlyProperty);
    }
}

new MyClass().myReadonlyProperty = 5; // error, readonly
```

#### Q. What is getters and setters in TypeScript?
TypeScript supports getters/setters as a way of intercepting accesses to a member of an object. This gives a way of having finer-grained control over how a member is accessed on each object.
```typescript
class Employee {
   
    private _name: string;

    get Name() {
        return this._name;
    }
    set Name(val) {
        this._name = val;
    }
}
```
#### Q. Is that TypeScript code valid?
```typescript
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```
Yes, the code is valid. A class declaration creates two things: a type representing instances of the class and a constructor function. Because classes create types, we can use them in the same places we would be able to use interfaces.

#### Q. Explain how and why we could use property decorators in TS?
Decorators can be used to modify the behavior of a class or become even more powerful when integrated into a framework. For instance, if your framework has methods with restricted access requirements (just for admin), it would be easy to write an @admin method decorator to deny access to non-administrative users, or an @owner decorator to only allow the owner of an object the ability to modify it.

```typescript
class Employee {
    get() { }
    post() { }

    @admin
    delete() { }

    @owner
    put() { }
}
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. What is the difference between "interface vs type" statements?
```typescript
interface X {
    a: number
    b: string
}

type X = {
    a: number
    b: string
};
```
|interface	                                                     |type                                                     |
|----------------------------------------------------------------|---------------------------------------------------------|
|An interface declaration always introduces a named object type. |	A type alias declaration can introduce a name for any kind of type, including primitive, union, and intersection types.|
|An interface can be named in an extends or implements clause.	 |Type alias for an object type literal cannot be named in an |extends or implements clause.|
|Interfaces create a new name that is used everywhere.	         |Type aliases don't create a new name.|
|An interface can have multiple merged declarations.	         |Type alias for an object type literal cannot have multiple merged declarations.|

#### Q. What is Rest parameters?
The rest parameter is used to pass zero or more values to a function. It is declared by prefixing the three **dot** characters **('...')** before the parameter. It allows the functions to have a variable number of arguments without using the arguments object. 

**Rules**:
* Only one rest parameter is allowed in a function.
* It must be an array type.
* It must be a last parameter in the parameter list.

```typescript
function sum(a: number, ...b: number[]): number {    
    let result = a;    
    for (var i = 0; i < b.length; i++) {    
        result += b[i];    
    }    
    console.log(result);    
}    
let result1 = sum(3, 5);    
let result2 = sum(3, 5, 7, 9);   
```
<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>

#### Q. Explain Enum in TypeScript?
Enums or enumerations are a TypeScipt data type that allow us to define a set of named constants. Using enums can make it easier to document intent, or create a set of distinct cases. It is a collection of related values that can be numeric or string values.

*Example*
```typescript
enum Gender {  
  Male,  
  Female  
  Other  
}  
console.log(Gender.Female); // Output: 1  
//We can also access an enum value by it's number value.  
console.log(Gender[1]); // Output: Female  
```
#### Q. Why do you need type definitions?
#### Q. How would you define a custom type?
#### Q. What is the difference between an Interface and a Class?
#### Q. First line below gives compile error, second line doesn't. Why?
```typescript
someService.someMethod(x);
someService['someMethod'](x);
```
#### Q. What are Discriminated union types?
#### Q. How do you define Object of Objects type in typescript?
#### Q. How can you capture the 'type' the user provides (e.g. number), so that we can use that information later.

<div align="right">
    <b><a href="#">↥ back to top</a></b>
</div>
