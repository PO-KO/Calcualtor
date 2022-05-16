class Calculator {
  constructor(prevOp, currentOp) {
    this.prevOp = prevOp;
    this.currentOp = currentOp;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNum(num) {
    if (this.currentOperand.toString().includes(".") && num === ".") return;

    this.currentOperand = this.currentOperand.toString() + num.toString();
  }

  getDisplayNum(num) {
    let stringNum = num.toString();
    let integerDigits = parseFloat(stringNum.split(".")[0]);
    let decimalDigits = stringNum.split(".")[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDiplay() {
    this.currentOp.innerText = this.getDisplayNum(this.currentOperand);

    if (this.operation != null) {
      this.prevOp.innerText = `${this.getDisplayNum(this.prevOperand)} ${
        this.operation
      }`;
    } else {
      this.prevOp.innerText = "";
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.prevOperand != "") this.compute();

    this.operation = operation;
    this.prevOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    let prev = parseFloat(this.prevOperand);
    let current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }
}

const numsBtns = document.querySelectorAll("[data-num");
const oprBtns = document.querySelectorAll("[data-operation");
const acBtn = document.querySelector("[data-all-clear");
const delBtn = document.querySelector("[data-del");
const equalBtn = document.querySelector("[data-equal");
const prevOp = document.querySelector("[data-prev-operand]");
const currentOp = document.querySelector("[data-current-operand]");

let calculator = new Calculator(prevOp, currentOp);

acBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDiplay();
});

delBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDiplay();
});

numsBtns.forEach((num) => {
  num.addEventListener("click", () => {
    calculator.appendNum(num.innerText);
    calculator.updateDiplay();
  });
});

oprBtns.forEach((opr) => {
  opr.addEventListener("click", () => {
    calculator.chooseOperation(opr.innerText);
    calculator.updateDiplay();
  });
});

equalBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDiplay();
});
