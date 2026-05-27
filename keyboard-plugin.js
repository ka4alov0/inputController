class KeyboardPlugin{

    constructor(target = document){
        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        this.target = target
    }
    
    attach(){
        if(this.controller.focused){
            this.target.addEventListener('keydown', this.keyDown)
            this.target.addEventListener('keyup', this.keyUp)
        }
    }

    detach(){
        if(!this.controller.focused){
            this.target.removeEventListener('keydown', this.keyDown)
            this.target.removeEventListener('keyup', this.keyUp)
            this.controller.activeActions.clear()
            this.controller.pressedKeys.clear()
        }
    }

    keyDown(event){
        let pressed = event.button
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
                        this.controller.actionOn(actionName, actionData, pressed)
                    }
                }
            }
        }
    }

    keyUp(event){
        if(this.controller.enabled){
            this.controller.pressedKeys.delete(event.keyCode)
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
                        this.controller.actionOff(actionName, actionData)
                    }
                }
            }
        }
    }
}