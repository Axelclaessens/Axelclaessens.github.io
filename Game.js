let matrix = new Matrix(WIDTH, HEIGHT);
let r 
let c 

function setup() {
    matrix.init()
    frameRate(5)
}

function draw() {
    matrix.clear()
    showLed(r, c)

    let x = readJoystickX()
     c = Math.round(x /1023*(WIDTH-1))
     
     
    let y = readJoystickY()
    r = Math.round((1023-y) / 1023 * (HEIGHT-1))
    console.log(y)
    matrix.show() 
}

function showLed(row, col) {
    matrix.setLed(row, col, true, color('purple'))
}



