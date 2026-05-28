
const controllerOn = document.getElementById('controllerOn')
const controllerOff = document.getElementById('controllerOff')
const enableActionLeft = document.getElementById('enableActionLeft')
const disableActionLeft = document.getElementById('disableActionLeft')
const bindSpace = document.getElementById('bindSpace')

controllerOn.addEventListener('click', (event) => {controller.controllerOn()})
controllerOff.addEventListener('click', (event) => {controller.controllerOff()})
enableActionLeft.addEventListener('click', (event) => {controller.enableAction('left')})
disableActionLeft.addEventListener('click', (event) => {controller.disableAction('left')})
bindSpace.addEventListener('click', (event) => {controller.bindActions({"jump": {mouse: [1], keyboard: [32]}})})

const controller = new InputController({
    "left": {
        mouse: [0],
        keyboard: [37,65],
    },
    "right": {
        mouse: [2],
        keyboard: [39,68]
    }
}, window)

const keyboardPlugin = new KeyboardPlugin()
const mousePlugin = new MousePlugin()

controller.addPlugin(keyboardPlugin)
controller.addPlugin(mousePlugin)

const gameArea = document.getElementById('gameArea')
const ctx = gameArea.getContext('2d')
let block = {
    x: gameArea.width/2 - 50,
    y: gameArea.height/2 - 50,
    width: 100,
    height: 100,
    speed: 10,
    color: 'black'
}

function drawBlock() {
    ctx.fillStyle = block.color
    ctx.fillRect(block.x, block.y, block.width, block.height)
}

function game() {
    ctx.clearRect(0, 0, gameArea.width, gameArea.height)
    if (controller.isActionActive('left')){
        if (block.x <= 0) {
            block.x = 0
        }
        else block.x -= block.speed
    }
    if (controller.isActionActive('right')){
        if (block.x + block.width >= gameArea.width) {
            block.x = gameArea.width - block.width
        }
        else block.x += block.speed
    }
    if (controller.isActionActive('jump')){
        block.color = 'red'
    } else block.color = 'black'
    drawBlock()
    requestAnimationFrame(game)
}

game()