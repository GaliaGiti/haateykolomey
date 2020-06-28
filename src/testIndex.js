const Brush = require('./classes/brush').Brush
const Board = require('./classes/board').Board


const drawingCanvas = document.getElementById("canvas");

// const myBoard = new Board(drawingCanvas, 100, 200);


const myBoard = new Board( drawingCanvas, 100, 200, 'white' );


console.log("board created hoilo")
const myBrush = new Brush(2, "black", "kolom", myBoard.getCanvas());

const colorUserChosen = document.getElementById('colorUserChosen')
colorUserChosen.addEventListener('change', () => {

    myBrush.setBrushColor(colorUserChosen.value)
})

const userChosenBoardColor = document.getElementById('userChosenBoardColor')
userChosenBoardColor.addEventListener('change', ()=>{
    myBoard.setBoardColor(userChosenBoardColor.value)
})
/*const boardButton = document.getElementById('boardButton')
boardButton.addEventListener('change', ()=>{
    myBoard.setBoardColor(boardButton.value)
})*/

myBoard.enableEventListeners()
const mainDrawingLoop = () => {
    if (myBoard.isDrawingPossible) {
        myBrush.drawCircle(myBoard.drawingInfo.currentX, myBoard.drawingInfo.currentY, myBrush.getBrushColor())
 
        const combainedDrawingInfo = {
            currentX: myBoard.drawingInfo.currentX,
            currentY: myBoard.drawingInfo.currentY,
            currentColor: myBrush.getBrushColor()
            
            
            
        }
        clientSocket.emit("somebodyIsDrawing", combainedDrawingInfo)
    }
    requestAnimationFrame(mainDrawingLoop)


}
mainDrawingLoop()


const otherClientBrush = new Brush( 4, "green", "pencil", myBoard.getCanvas());
clientSocket.on("serveremittedDrawingInfo", (receivedDrawingInfo) => {
    console.log(receivedDrawingInfo)
    otherClientBrush.drawCircle(receivedDrawingInfo.currentX, receivedDrawingInfo.currentY, receivedDrawingInfo.color)
})