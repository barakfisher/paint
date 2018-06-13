
var colorArr = ["black", "blue", "green", "yellow", "red", "purple", "white", "orange", "gray", "pink"];

var myTool = {
    brushColorNumber: "1",
    brushSize: "4",
    brushColor: "black"
}
var canvasDimentions = {
    xMin: "0",
    xMax: "0",
    yMin: "0",
    yMax: "0"
}

document.body.style.display = "flex";
document.body.style.justifyContent = "center";


var canvasContainer = document.createElement("div");
    canvasContainer.style.width = "500px";
    canvasContainer.style.height = "500px";
    canvasContainer.style.position = "relative";
    canvasContainer.style.border = "1px solid black";
    canvasContainer.setAttribute("id", "myCanvasContainerId");
    canvasContainer.style.display = "flex";
    canvasContainer.style.alignItems = "space-between";
    canvasContainer.style.flexDirection = "column";
    document.body.appendChild(canvasContainer);


var myCanvas = document.createElement("div");
    myCanvas.style.width = "100%";
    myCanvas.style.height = "90%";
    myCanvas.style.overflow = "hidden";
    myCanvas.style.position = "relative";
    myCanvas.style.boxSizing = "border-box";
    myCanvas.style.background = "transparent";
    myCanvas.setAttribute("id", "myCanvasId");
    myCanvas.addEventListener("mousemove", paint);
    myCanvas.addEventListener("click", paint);
    canvasContainer.appendChild(myCanvas);
    myCanvas.style.cursor = "url('./images/" + myTool.brushColor + "Brush.png') 4 32,  auto";




var bottomMenu = document.createElement("div");
    bottomMenu.style.width = "100%";
    bottomMenu.style.boxSizing = "border-box";
    bottomMenu.style.height = "10%";
    bottomMenu.style.display = "flex";
    bottomMenu.style.justifyContent = "space-around";
    bottomMenu.style.alignItems = "center";
    bottomMenu.style.backgroundColor = "blue";
    bottomMenu.style.border = "1px solid black";
    bottomMenu.setAttribute("id", "bottomMenu");
    canvasContainer.appendChild(bottomMenu);

var brushSizeContainer = document.createElement("input");
    brushSizeContainer.type = "number";
    brushSizeContainer.placeholder = "size";
    brushSizeContainer.style.width = "45px";
    brushSizeContainer.setAttribute("id", "brushSizeContainerId");
    bottomMenu.appendChild(brushSizeContainer);
    brushSizeContainer.addEventListener("blur", changeBrushSize);

var colorPallet = document.createElement("div");
    colorPallet.style.width = "30%";
    colorPallet.style.height = "50%";
    colorPallet.style.boxSizing = "border-box";
    colorPallet.style.border = "1px solid black";
    colorPallet.style.color = "black";
    colorPallet.setAttribute("id", "myPallet");
    bottomMenu.appendChild(colorPallet);

var colorNumber = "";
for (var i = 1; i <= colorArr.length; i++) {
    colorNumber = document.createElement("div");
    colorNumber.style.display = "inline-block";
    colorNumber.style.width = "20%";
    colorNumber.style.height = "50%";
    colorNumber.style.border = "1px solid black";
    colorNumber.style.boxSizing = "border-box";
    colorNumber.style.cursor = "pointer";
    colorNumber.setAttribute("id", "item" + i);

    colorNumber.style.backgroundColor = "" + colorArr[i - 1];
    colorPallet.appendChild(colorNumber);

    document.getElementById("item" + i).addEventListener("click", pickColor);
}

var clearScreen = document.createElement("BUTTON");
    var buttonTxt = document.createTextNode("New")
    clearScreen.appendChild(buttonTxt);
    bottomMenu.appendChild(clearScreen);
    clearScreen.addEventListener("click", reloadPage);

function pickColor(event) {
    myTool.brushColorNumber = getItemNumber(event.target.id);
    myTool.brushColor = colorArr[getItemNumber(event.target.id) - 1];
    myCanvas.style.cursor = "url('./images/" + myTool.brushColor + "Brush.png') 4 32,  auto";
}

function getItemNumber(str) {
    len = str.length;
    if (!isNaN(str[len - 2])) {
        return parseInt(str.substring(len - 2, len));
    }
    return parseInt(str[len - 1]);
}

function paint(event) {
    canvasDimentions.xMin = myCanvas.getClientRects()[0].x;
    canvasDimentions.xMax = myCanvas.getClientRects()[0].x + myCanvas.getClientRects()[0].width;
    canvasDimentions.yMin = myCanvas.getClientRects()[0].y;
    canvasDimentions.yMax = myCanvas.getClientRects()[0].y + myCanvas.getClientRects()[0].height;
    if ((event.buttons == 1 || event.type == "click") && event.clientX > canvasDimentions.xMin && event.clientX < canvasDimentions.xMax &&
        event.clientY > canvasDimentions.yMin && event.clientY < canvasDimentions.yMax) {
        this.appendChild(createColorDiv());
    }
}



function createColorDiv() {
    var newColorDiv = document.createElement("div");
    newColorDiv.style.left = event.clientX - canvasDimentions.xMin - myTool.brushSize / 2;
    newColorDiv.style.top = event.clientY - canvasDimentions.yMin - myTool.brushSize / 2;
    newColorDiv.classList.add("color", colorArr[myTool.brushColorNumber - 1]);
    newColorDiv.style.width = myTool.brushSize;
    newColorDiv.style.height = myTool.brushSize;
    return newColorDiv;
}

function reloadPage() {
    location.reload();
}

function changeBrushSize() {
    myTool.brushSize = brushSizeContainer.value;
}