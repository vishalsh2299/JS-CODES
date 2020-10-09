// Bind
// It creates a function whose body is similar to the function on which it is called
function func() {
  console.log("I'm The king");
}

var func2 = func.bind();
func2(); // duplicate

// this, it refers to the object it belongs to
var person = {
  name: "Vishal Singh",
  age: 22,
  gender: "Male",
  details: function () {
    return `My name is ${this.name}, I'm ${this.age} years old ${this.gender}`;
  },
};
console.log(person.details());

// this with bind
// this refers to the first param of the bind
function family() {
  return this;
}
console.log(family()); // it will give the window object as alone this refers to the global object
var newFamily = family.bind("Vishal", "Rahul"); // it will give the first param
console.log(newFamily());

// another example
function add(a, b) {
  return a + b;
}
var newadd = add.bind(null, 10); // first null param passes the saem this reference to next function. param freezed.
console.log(newadd(20));
