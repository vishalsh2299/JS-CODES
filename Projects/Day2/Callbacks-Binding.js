// function stored as variable
var execute = function () {
  console.log("Executed");
};
// Function passed as an argument
// function inside function creates callbacks
function newFunc(anotherFunc) {
  anotherFunc();
}
newFunc(execute);
