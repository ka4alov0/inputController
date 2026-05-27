class MousePlugin{

    constructor(target = document){
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
        this.target = target
    }

    attach(){
        if(this.controller.focused){
            this.target.addEventListener('mousedown', this.mouseDown)
            this.target.addEventListener('mouseup', this.mouseUp)
        }
    }

    detach(){
        if(!this.controller.focused){
            this.target.removeEventListener('mousedown', this.mouseDown)
            this.target.removeEventListener('mouseup', this.mouseUp)
            this.controller.activeActions.clear()
            this.controller.pressedKeys.clear()
        }
    }

    mouseDown(event){
        let pressed = event.button
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.mouse.includes(event.button)){
                        this.controller.actionOn(actionName, actionData, pressed)
                    }
                }
            }
        }
    }

    mouseUp(event){
        if(this.controller.enabled){
            this.controller.pressedKeys.delete(event.button)
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.mouse.includes(event.button)){
                        this.controller.actionOff(actionName, actionData)
                    }
                }
            }
        }
    }
}