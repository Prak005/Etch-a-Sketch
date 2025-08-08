const container = document.querySelector("#container");
const innerGridElement = document.querySelector("#grid");
const gridInput = document.querySelector("#grid-input");
const reset = document.querySelector("#reset");
const buttons = document.querySelectorAll(".color-btn");
const toggle = document.querySelector("#toggle");
const random = document.querySelector("#random");
const opacity = document.querySelector("#opacity");


let enableOpacity = false;
let randomColor = false;
let input = +gridInput.value; // Initial grid size from input
let color = "gray";
let showGridLines = true;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        randomColor = false;
        random.classList.remove("pushed-state")
        random.setAttribute("style", "background-color: white; color: black;");
        color = btn.id;
        buttons.forEach(b => {
            b.style.backgroundColor = "white";
            b.style.color = "black";
        });
        btn.style.backgroundColor = btn.id;
        btn.style.color = "yellow";
        if (btn.id === "white") {
            btn.style.backgroundColor = "black";
            btn.style.color = "white";
        }
    });
});

function generateGrid(size) {
    innerGridElement.innerHTML = "";

    for (let i = 0; i < size; i++) {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let j = 0; j < size; j++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.backgroundColor = "gray";
            if (showGridLines) {
                cell.classList.add("border-cell");
            }
            cell.addEventListener("mouseover", () => {
                if (randomColor) {
                    const r = Math.floor(Math.random() * 256);
                    const g = Math.floor(Math.random() * 256);
                    const b = Math.floor(Math.random() * 256);
                    color = `rgb(${r}, ${g}, ${b})`;
                }
                if (enableOpacity) {
                    let curr = parseFloat(cell.style.opacity) || 0;
                    if (curr < 1) {
                        cell.style.opacity = curr + 0.1;
                    }
                } else {
                    cell.style.opacity = 1;
                }
                cell.style.backgroundColor = color;
            });
            row.append(cell);
            innerGridElement.append(row);
        }
    }
}


reset.addEventListener("click", () => {
    color = "gray";
    buttons.forEach(b => {
        b.style.backgroundColor = "white";
        b.style.color = "black";
    });
    showGridLines = true;
    toggle.classList.add("pushed-state");
    randomColor = false;
    random.removeAttribute("style");
    random.classList.remove("pushed-state");
    enableOpacity = false;
    opacity.classList.remove("pushed-state");
    generateGrid(input);
});

generateGrid(input);                        //initial grid loaded at page reload

gridInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        input = +gridInput.value;
        generateGrid(input);
    }
});

function toggleGridlines() {
    showGridLines = !showGridLines;
    toggle.classList.toggle('pushed-state');
    const allCells = document.querySelectorAll('.cell');
    allCells.forEach(cell => {
        if (showGridLines) {
            cell.classList.add('border-cell');
        } else {
            cell.classList.remove('border-cell');
        }
    });
}
toggle.addEventListener("click", toggleGridlines);

if (showGridLines) {
    toggle.classList.add('pushed-state');
}

random.addEventListener("click", () => {
    randomColor = !randomColor;
    if (randomColor) {
        random.removeAttribute("style");
        buttons.forEach(b => {
            b.style.backgroundColor = "white";
            b.style.color = "black";
        });
    } else {
        random.setAttribute("style", "background-color : " + color);
    }
    random.classList.toggle("pushed-state");
});

opacity.addEventListener("click", () => {
    enableOpacity = !enableOpacity;
    opacity.classList.toggle("pushed-state");
    if (!enableOpacity) {

    }
});