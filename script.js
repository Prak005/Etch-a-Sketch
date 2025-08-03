const container = document.querySelector("#container");
const innerGridElement = document.querySelector("#grid");
const gridInput = document.querySelector("#grid-input");
const reset = document.querySelector("#reset");
const buttons = document.querySelectorAll(".color-btn");
const toggle = document.querySelector("#toggle");

let input = +gridInput.value; // Initial grid size from input
let color = "gray";
let showGridLines = false;

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
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
    generateGrid(input);
}

toggle.addEventListener("click", toggleGridlines);