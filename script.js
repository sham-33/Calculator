let num1, num2;
let op = "+";
let display = "";
let result = null;
let decimal = true;
let reset = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}

function reminder(a, b) {
    return a % b;
}

function operator(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    if (op == "+") {
        return add(a, b);
    } else if (op == "-") {
        return subtract(a, b);
    } else if (op == "x") {
        return multiply(a, b);
    } else if (op == "/") {
        return divide(a, b);
    } else if (op == "%") {
        return reminder(a, b);
    }
}

function compute(nList, oList) {
    let operList = ["x","%", "/", "-", "+"];
    nList = nList.filter(n => n);
    console.log(nList.length, oList.length);
    while (oList.length != 0) {
        operList.forEach((o) => {
            let loc = oList.findIndex((op) => op == o);
            if (loc != -1) {
                
                result = operator(nList[loc], nList[loc + 1], o);
                nList.splice(loc, 2, result);
                oList.splice(loc, 1, );
            }
        })
        console.log(oList);
    }
    if (Number.isInteger(result)) {
        display = String(result.toFixed(0));
    } else {
        display = String(result.toFixed(5));
    }
    
    updateDisplay();
}




function isOperator(a) {
    return (a == "+" || a == "x" || a == "-" || a == "/" || a == "%");
}


const screen = document.querySelector(".display");
function updateDisplay() {
    screen.textContent = display;
}

function addNum(num) {
    if (num == "." && !decimal) return;
    display += num;
    updateDisplay();
}


const numbers = document.querySelectorAll(".num");
numbers.forEach((item) => {
    item.addEventListener("click", (e) => {
        
        addNum(item.textContent);
    });
})

const clearBtn = document.querySelector(".cbtn");
clearBtn.addEventListener("click", (e) => {
    display =  "";
    result = null;
    updateDisplay();
})

const delBth = document.querySelector(".delbtn");
delBth.addEventListener("click", (e) => {
    display = display.substring(0, display.length - 1);
    updateDisplay();
});

const operators = document.querySelectorAll(".oper");
operators.forEach((item) => {
    item.addEventListener("click", (e) => {
        if (result != null && !reset) {
            let temp = display.split(/[/x%+-]/);
            num2 = parseFloat(temp[temp.length - 1]);
            result = operator(result , num2, op);
        } else {
            result = parseFloat(display);
            reset = false;
        }
        display += e.target.textContent;
        op = e.target.textContent;
        console.log(result);
        updateDisplay();
    });
})

const equal = document.querySelector(".equals");
equal.addEventListener("click", (e) => {
    
    reset = true;
    
    let temp = display.split(/[/x%+-]/);
    num2 = parseFloat(temp[temp.length - 1]);
    result = operator(result , num2, op);    

    if (Number.isInteger(result)) {
        display = String(result.toFixed(0));
    } else {
        display = String(result.toFixed(5));
    }
    updateDisplay();
    
})



