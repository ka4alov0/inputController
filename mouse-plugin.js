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
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.mouse.includes(event.button)){
                        const keyboardActive = actionData.keys.keyboard.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        const mouseActive = actionData.keys.mouse.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        this.controller.pressedKeys.add(event.button)
                        this.controller.activeActions.add(actionName)
                        if(!keyboardActive && !mouseActive){
                            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                                detail: actionName
                            }))
                        }
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
                        const keyboardActive = actionData.keys.keyboard.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        const mouseActive = actionData.keys.mouse.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        if(!keyboardActive && !mouseActive){
                            this.controller.activeActions.delete(actionName)
                            this.controller.target.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
                                detail: actionName
                            }))
                        }
                    }
                }
            }
        }
    }
}