class Board {
    constructor(canvas, boardWidth, boardHeight) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.canvas = canvas;
        this.isDrawingPossible = false;
        this.drawingInfo = {
            currentX: 0,
            currentY: 0,
        }

        this.fitCanvasToParent();
        // ei kotha ti mone rekho
    }

    getCanvas(){
        return this.canvas;
    }

    fitCanvasToParent(){
        this.getCanvas().width = this.getCanvas().parentElement.offsetWidth;
        this.getCanvas().height = this.getCanvas().parentElement.offsetHeight;
    }

    enableEventListeners() {
        let isMouseMoving = false;
        let isMouseDown = false;
        const decideIsDrawingPossible = () => {
            if(isMouseDown && isMouseMoving){
                this.isDrawingPossible = true;
            } else {
                this.isDrawingPossible = false;
            }
        }

        // handling mousedown events
        this.canvas.addEventListener("mousedown", (e) => {
            isMouseDown = true;
            decideIsDrawingPossible();
            this.drawingInfo.currentX = e.offsetX;
            this.drawingInfo.currentY = e.offsetY;
        })
        
        // handling mousemove
        this.canvas.addEventListener("mousemove", (e) => {
            isMouseMoving = true;
            decideIsDrawingPossible();
            this.drawingInfo.currentX = e.offsetX;
            this.drawingInfo.currentY = e.offsetY;
            
        })
        
        // handling mouseup events
        this.canvas.addEventListener("mouseup", (e) => {
            isMouseDown = false;
            decideIsDrawingPossible();
        })
    }
}

module.exports = {
    Board: Board
}