class KeyboardPlugin{

    constructor(target = document){
        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        this.pressedKeys = new Set()
        this.target = target
        this.active = new Set()
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
            this.pressedKeys.clear()
        }
    }

    keyDown(event){
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
                        this.pressedKeys.add(event.keyCode)
                        this.controller.actionOn(actionName, this)
                    }
                }
            }
        }
    }

    keyUp(event){
        if(this.controller.enabled){
            this.pressedKeys.delete(event.keyCode)
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
                        const isActive = actionData.keys.keyboard.some((key) => {
                            return this.pressedKeys.has(key)
                        })
                        if(!isActive){
                            this.controller.actionOff(actionName, this)
                        }
                    }
                }
            }
        }
    }
}