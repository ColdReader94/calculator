class Calculator {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;      
        this.resetState = false;
        this.clear();
    }
    
    delete() {
       this.currentValue = this.currentValue.toString().slice(0, -1);
    }
    
    clear() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = '';
		this.resetState = false;
    }
    
    sqrt() {
        this.currentValue = Math.sqrt(this.currentValue);
    }  
    
    appendNumber(number) {
    if (number === '.' && this.currentValue.includes('.')) return;
    this.currentValue = this.currentValue.toString() + number.toString();
  }
  
   chooseOperation(operation) {
    if (this.currentValue === '') return;
    if (this.previousValue !== '' && this.currentValue !== '') {
      this.compute();
    }    
    this.operation = operation;
    this.previousValue = this.currentValue;
    this.currentValue = '';
  }
  
  compute() {
    let result;
    const previousNum = parseFloat(this.previousValue);
    const currentNum = parseFloat(this.currentValue);
    if (isNaN(previousNum) || isNaN(currentNum)) return;
    switch (this.operation) {
      case '+':
        result = previousNum + currentNum;
        break
      case '-':
        result = previousNum - currentNum;
        break
      case '*':
        result = previousNum * currentNum;
        break
      case '/':
        result = previousNum / currentNum;
        break
       case 'xy':
        result = Math.pow(previousNum, currentNum);
        break
      default:
        return;
    }
    
      
    let isDec = result.toString().includes('.', 0);
//    две переменные ниже подсчитывают количество цифр после точки текущего и предыдущего операндов, таким вот неадекватным способом :(
    let prevValLength = this.previousValue.toString().split('').reverse().toString().split('.', 1).toString().split('').length;    
    let curValLength = this.currentValue.toString().split('').reverse().toString().split('.', 1).toString().split('').length;
    
    if (this.operation === 'xy') {
        return this.currentValue = result;
    }
    
    this.resetState = true;  
    this.operation = undefined;
    this.previousValue = "";     
    
        
    if (isDec === true && prevValLength >= curValLength) {
        result = result.toFixed(prevValLength);
        result = result.toString();
        for(let i = result.length - 1; result[i] == '0'; i--) {
        result.slice(0, -1);   
        }
        result = parseFloat(result);
        return this.currentValue = result;
    }
    if (isDec === true && prevValLength <= curValLength) {
        result = result.toFixed(curValLength);
        result = result.toString();
        for(let i = result.length - 1; result[i] == '0'; i--) {
        result.slice(0, -1);        
        }
        result = parseFloat(result);
       return this.currentValue = result;        
    } else {
        return this.currentValue = result;
    };   
  }
    
    display() {
        previousValue.innerText = this.previousValue;
        currentValue.innerText = this.currentValue;
    }
    
    getDisplayNumber(num) {
    let stringNum = num.toString();
    let int = parseFloat(stringNum.split('.')[0]);
    let dec = stringNum.split('.')[1];
    let integerDisplay;
    if (isNaN(int)) {
      integerDisplay = '';
    } else {
      integerDisplay = int.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    if (dec !== null) {
      return `${integerDisplay}.${dec}`;
    } else {
      return integerDisplay;
    }
  }
  
  updateDisplay() {
    this.currentValue.innerText = this.getDisplayNumber(this.currentValue);
    if (this.operation !== null) {
      this.previousValue.innerText = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`;
    } else {
      this.previousValue.innerText = '';
    }
  }
}


let numberButtons = document.querySelectorAll('[data-number]');
let operationButtons = document.querySelectorAll('[data-operation]');
let equalsButton = document.querySelector('[data-equals]');
let deleteButton = document.querySelector('[data-delete]');
let clearButton = document.querySelector('[data-clear]');
let previousValue = document.querySelector('[data-previous-value]');
let currentValue = document.querySelector('[data-current-value]');
let sqrtButton = document.querySelector('[data-sqrt]');
let minusButton = document.querySelector('[data-minus]');

let calculator = new Calculator(previousValue, currentValue);


numberButtons.forEach(button => {
  button.addEventListener("click", () => {

      if(calculator.previousValue === "" && calculator.currentValue !== "" && calculator.resetState) {
          calculator.currentValue = "";
          calculator.resetState = false;
      }
      calculator.appendNumber(button.innerText);
      calculator.display();
  });
});

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.display();
  });
});

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.display();
});

clearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.display();
});

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.display();
});

sqrtButton.addEventListener('click', button => {
  calculator.sqrt();
  calculator.display();
});

minusButton.addEventListener('click', button => {
  if(calculator.currentValue === '' && (calculator.operation === '' || calculator.operation !== '-')) {
      calculator.currentValue += '-';
      calculator.display();
  } else {
  calculator.chooseOperation(minusButton.innerText);
  calculator.display();
  }
});

