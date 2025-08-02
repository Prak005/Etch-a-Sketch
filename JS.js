const container = document.querySelector("#container");
const grid = document.querySelector("input");

let input = +grid.value;
const containerWidth = 650;

container.setAttribute("style", "width:" + containerWidth + "px;");

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
        div.style.backgroundColor = "orange";
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
