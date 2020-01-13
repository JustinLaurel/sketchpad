"use Strict"
const HOVER_INCREMENT = 50;

function createCells() {
    let gridSize = prompt("What grid size?");
    let container = document.querySelector('#container');
    let resetButton = document.querySelector('#reset');

    implementGrid(container, gridSize);
    resetButton.addEventListener('click', resetSketchpad);
    appendCells(container, gridSize); //working until here
}

function resetSketchpad() {
    //May want to refactor next line to take container from argument instead
    document.querySelector('#container').innerHTML = ""; 
    createCells();
}


function appendCells(container, gridSize) { //working
    for (let currentRow = 1; currentRow <= gridSize; currentRow++) {
        for(let currentColumn = 1; currentColumn <= gridSize; currentColumn++) {
            let cell = document.createElement('div');
            cell.classList.add('cell', `row${currentRow}`, `col${currentColumn}`);
            cell.style.backgroundColor = "hsl(0, 0%, 0%)";
            //See increaseBrightness() for why the next line is here
            cell.style.filter = "brightness(0%)"; 
            cell.addEventListener('mouseover', onHover);
            container.appendChild(cell);
        }
    }
}

function implementGrid(container, gridSize) { //working
    let template = `repeat(${gridSize}, 1fr) / repeat(${gridSize}, 1fr)`;
    container.style.gridTemplate = template;
}

function onHover(mouseEvent) {
    let cell = mouseEvent.target;
    increaseBrightness(cell);
}

function increaseBrightness(cell) {
    let brightness = cell.style.filter;
    console.log(cell.style.filter);
    
    let brightnessNumber = Number(brightness.substring(brightness.indexOf('(') + 1, 
            brightness.indexOf("%")));
    if ((brightnessNumber += HOVER_INCREMENT) <= 100) {
        //Brightness property literally does nothing for background-color. So here 
        //brightness is just to keep track of the brightness the cell, then the 
        //actual brightness is added to the cell using HSL
        //HSL is converted to RGB when the page is rendered, so I can't track the
        //brightness using HSL either
        cell.style.backgroundColor = `hsl(0, 0%, ${brightnessNumber}%)`;
        cell.style.filter = `brightness(${brightnessNumber}%)`;  
    } else {
        cell.style.backgroundColor = `hsl(0, 0%, ${100}%)`;
        cell.style.filter = `brightness(${100}%)`;  
    }
}


createCells();