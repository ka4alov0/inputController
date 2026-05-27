class MousePlugin{

    constructor(target = document){
        this.mouseDown = this.mouseDown.bind(this)
        this.mouseUp = this.mouseUp.bind(this)
        this.pressedButtons = new Set()
        this.target = target
        this.active = new Set()
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
            this.pressedButtons.clear()
        }
    }

    mouseDown(event){
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.mouse.includes(event.button)){
                        this.pressedButtons.add(event.button)
                        this.controller.actionOn(actionName, this)
                    }
                }
            }
        }
    }

    mouseUp(event){
        if(this.controller.enabled){
            this.pressedButtons.delete(event.button)
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.mouse.includes(event.button)){
                        const isActive = actionData.keys.mouse.some((key) => {
                            return this.pressedButtons.has(key)
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