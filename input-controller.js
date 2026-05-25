class InputController{

    enabled = true
    focused = true

    static ACTION_ACTIVATED = "input-controller:action-activated"
    static ACTION_DEACTIVATED = "input-controller:action-deactivated"

    constructor(actionsToBind = {}, target=''){
        this.target = target
        this.activeActions = new Set()
        this.pressedKeys = new Set()
        this.actions = new Map()
        this.bindActions(actionsToBind)
    }

    bindActions(actionsToBind){
        for(let key in actionsToBind){
            this.actions.set(actionsToBind[key])
        }
    }

    enableAction(actionName){

    }

    disableAction(actionName){
        
    }

    attach(target, dontEnable = false){

    }

    detach(){

    }

    isActionActive(action){
        if(this.activeActions.has(action)) {
            return true
        }
        else return false
    }

    isKeyPressed(keyCode){
        if(this.pressedKeys.has(keyCode)){
            return true
        }
        else return false
    }

    keyDown(event){

    }

    keyUp(event){

    }
    
}

const controller = new InputController({
    "left": {
        keys: [37,65],
    },
    "right": {
        keys: [39,68]
    }
}, '')

console.log(controller.actions)

const gameArea = document.getElementById('gameArea')

const ctx = gameArea.getContext("2d")

document.addEventListener('keydown', controller.keyDown(event))
document.addEventListener('keyup', controller.keyUp(event))

function game(){

    if (controller.isActionActive('left')) {
        console.log('left')
    }

    if (controller.isActionActive('right')) {
        console.log('right')
    }

    requestAnimationFrame(game)
}

game()