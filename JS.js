const container = document.querySelector("#container");
const grid = document.querySelector("input");

let input = +grid.value;
const containerWidth = 650;

container.setAttribute("style", "width:" + containerWidth + "px;");
let color = "grey";
const buttons = document.querySelectorAll(".color-btn");
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        color = btn.id;
        buttons.forEach(b => {
            b.style.backgroundColor = "white";
            b.style.color = "black";
        });
        btn.style.backgroundColor = btn.id;
        btn.style.color = "yellow";
        if (btn.id == "white") {
            btn.style.backgroundColor = "black";
            btn.style.color = "white";
        }
    });
});
const reset = document.querySelector("#reset");
reset.addEventListener("click", () => {
    color = "grey";
    buttons.forEach(b => {
        b.style.backgroundColor = "white";
        b.style.color = "black";
    });
    generateGrid(input);
});

function generateGrid(input) {
    let margin = 64 / input;
    const boxSize = (containerWidth / input) - margin * 2;          //dynamic boxSize 

    container.innerHTML = "";

    for (let i = 0; i < input * input; i++) {
        const div = document.createElement("div");
        div.setAttribute("style", `
            height: ${boxSize}px;
            width: ${boxSize}px;
            background-color: grey;
            margin: ${margin}px;
            display: inline-block;
        `);
        div.addEventListener("mouseover", () => {
            div.style.backgroundColor = color;
        });
        container.appendChild(div);
    }
}
generateGrid(input);    //initial grid loaded at page reload

grid.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        input = +grid.value;
        generateGrid(input);
    }
});
