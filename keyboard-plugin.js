class KeyboardPlugin{

    constructor(target = document){
        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        this.target = target
        this.attach
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
        console.log(this.controller.focused)
        if(this.controller.enabled){
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
                        const keyboardActive = actionData.keys.keyboard.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        const mouseActive = actionData.keys.mouse.some((key) => {
                            return this.controller.isKeyPressed(key)
                        })
                        this.controller.pressedKeys.add(event.keyCode)
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

    keyUp(event){
        if(this.controller.enabled){
            this.controller.pressedKeys.delete(event.keyCode)
            for(const [actionName, actionData] of this.controller.actions){
                if(actionData.enabled){
                    if(actionData.keys.keyboard.includes(event.keyCode)){
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

    oldKeyDown(event){
        if(this.enabled){
            for(const [actionName, actionData] of this.actions){
                if(actionData.enabled === true){
                    if(actionData.keys.includes(event.keyCode)){
                        const isActive = this.controller.isActionActive(actionName)
                        this.pressedKeys.add(event.keyCode)
                        this.activeActions.add(actionName)   
                        // console.log(isActive)
                        if(!isActive){
                            this.controller.target.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                                detail: actionName
                            }))
                            // console.log(isActive)
                        }
                    }
                }
            }
        }
    }

    oldKeyUp(event){
        if(this.enabled){
            this.pressedKeys.delete(event.keyCode)
            for(const [actionName, actionData] of this.actions){
                if(actionData.enabled === true){
                    if(actionData.keys.includes(event.keyCode)){
                        const isActive = actionData.keys.some((key) => {
                            return this.isKeyPressed(key)
                        })
                        if(!isActive){
                            this.activeActions.delete(actionName)
                            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
                                detail: actionName
                            }))
                        }
                    }
                }
            }
        }
    }
}