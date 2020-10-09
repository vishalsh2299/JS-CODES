var resultDisplayed = false;
var prev = [];

function getButtonPress() {
  var input = this.textContent;

  if (prev.length === 0 && (input === "/" || input === "*")) {
    input = "";
    prev = [];
    alert("First insert an operator");
  } else if (input === "=") {
    if (prev.length === 1) {
      alert("Insert more than one value");
    } else {
      prev = [];
      getResult();
    }
  } else if (resultDisplayed) {
    if (input !== "AC") {
      prev.push(input);
      document.calc.txt.value = input;
      resultDisplayed = false;
    } else {
      document.calc.txt.value = "";
      resultDisplayed = false;
    }
  } else if (input !== "AC") {
    if (
      (prev[prev.length - 1] === "*" ||
        prev[prev.length - 1] === "/" ||
        prev[prev.length - 1] === "+" ||
        prev[prev.length - 1] === "-" ||
        prev[prev.length - 1] === ".") &&
      (input === "*" || input === "/" || input === "+" || input === "-")
    ) {
      alert("No Double Operands allowed!!! Insert an operator...");
    } else if (prev[prev.length - 1] === "." && input === ".") {
      alert("Multiple decimals not allowed");
    } else {
      prev.push(input);
      document.calc.txt.value += input;

      resultDisplayed = false;
    }
  } else if (input === "AC") {
    prev = [];
    document.calc.txt.value = "";
    resultDisplayed = false;
  }

  console.log(prev);
}

// EVENT LISTENER
window.onload = function () {
  [].slice.call(document.getElementsByClassName("num")).forEach(function (e) {
    e.addEventListener("click", getButtonPress);
  });
};

// RESULT
function getResult() {
  const val = eval(calc.txt.value);

  if (val !== Infinity) document.calc.txt.value = val;
  else {
    document.calc.txt.value = "ERROR";
  }
  resultDisplayed = true;
}
