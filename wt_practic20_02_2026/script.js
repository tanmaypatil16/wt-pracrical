const display = document.getElementById("display");
const historyBox = document.getElementById("history");


function append(value) {
    if (display.value === "Error") display.value = "";
    display.value += value;
}


function appendNumber(num) {
    if (display.value === "Error") display.value = "";
    display.value += num;
}


function appendOperator(op) {
    if (display.value === "" || display.value === "Error") return;

    const last = display.value.slice(-1);

    // prevent stacking like ++--///
    if ("+-*/".includes(last)) {
        display.value = display.value.slice(0, -1) + op;
    } else {
        display.value += op;
    }
}


function appendDot() {
    if (display.value === "Error") display.value = "";

    const parts = display.value.split(/[\+\-\*\/()]/);
    const lastNumber = parts[parts.length - 1];

    if (!lastNumber.includes(".")) {
        display.value += ".";
    }
}

/* ========== PARENTHESES ========== */

function appendParenthesis(p) {
    if (display.value === "Error") display.value = "";

    const last = display.value.slice(-1);

    if (p === "(") {
        if (/\d/.test(last)) return;
        display.value += "(";
    }

    if (p === ")") {
        const open = (display.value.match(/\(/g) || []).length;
        const close = (display.value.match(/\)/g) || []).length;

        if (open > close && !"+-*/(".includes(last)) {
            display.value += ")";
        }
    }
}


function appendFunction(func) {
    if (display.value === "Error") display.value = "";

    const last = display.value.slice(-1);

    if (/[a-z]/i.test(last)) return;

    if (/\d/.test(last)) return;

    display.value += func + "(";
}


function clearDisplay() {
    display.value = "";
    historyBox.innerText = "";
}

function backspace() {
    display.value = display.value.slice(0, -1);
}


function calculate() {
    try {
        if (display.value.trim() === "") return;

        let expression = display.value;

        expression = expression
            .replace(/sin\(([^)]+)\)/g, (_, val) =>
                `Math.sin((${val})*Math.PI/180)`
            )
            .replace(/cos\(([^)]+)\)/g, (_, val) =>
                `Math.cos((${val})*Math.PI/180)`
            )
            .replace(/tan\(([^)]+)\)/g, (_, val) =>
                `Math.tan((${val})*Math.PI/180)`
            );

        let result = Function('"use strict";return (' + expression + ')')();

        if (!isFinite(result)) throw Error();

        historyBox.innerText = display.value + " =";
        display.value = result;

    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function (e) {

    if ("0123456789".includes(e.key)) {
        appendNumber(e.key);
    }

    else if ("+-*/".includes(e.key)) {
        appendOperator(e.key);
    }

    else if (e.key === ".") {
        appendDot();
    }

    else if (e.key === "(" || e.key === ")") {
        appendParenthesis(e.key);
    }

    else if (e.key === "Enter") {
        calculate();
    }

    else if (e.key === "Backspace") {
        backspace();
    }

    else if (e.key === "Escape") {
        clearDisplay();
    }
});