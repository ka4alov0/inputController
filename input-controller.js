class InputController{

    enabled = true
    focused = true

    static ACTION_ACTIVATED = "input-controller:action-activated"
    static ACTION_DEACTIVATED = "input-controller:action-deactivated"

    constructor(actionsToBind = {}, target=document){
        this.keyDown = this.keyDown.bind(this)
        this.keyUp = this.keyUp.bind(this)
        this.target = target
        this.activeActions = new Set()
        this.pressedKeys = new Set()
        this.actions = new Map()
        this.bindActions(actionsToBind)
        this.attach(target)
    }

    bindActions(actionsToBind){
        for(let actionName in actionsToBind){
            this.actions.set(actionName, {keys: actionsToBind[actionName].keys, enabled: true})
        }
        // console.log(this.actions)
    }

    enableAction(actionName){
        // enabled у action делает true, но сначала надо этот enabled добавить
        this.actions.get(actionName).enabled = true
        console.log(this.actions.get(actionName).enabled)
    }

    disableAction(actionName){
        // enabled у action делает false
        this.actions.get(actionName).enabled = false
        console.log(this.actions.get(actionName).enabled)
    }

    attach(target, dontEnable = false){
        this.focused = true
        if(this.focused){
            this.target.addEventListener('keydown', this.keyDown)
            this.target.addEventListener('keyup', this.keyUp)
        }
    }

    detach(){
        this.focused = false
        this.target.removeEventListener('keydown', this.keyDown)
        this.target.removeEventListener('keyup', this.keyUp)
        this.activeActions.clear()
        this.pressedKeys.clear()
    }

    isActionActive(action){
        if(this.activeActions.has(action)){
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
        if(this.enabled){
            for(const [actionName, actionData] of this.actions){
                if(actionData.enabled === true){
                    if(actionData.keys.includes(event.keyCode)){
                        const isActive = this.activeActions.has(actionName)
                        this.pressedKeys.add(event.keyCode)
                        this.activeActions.add(actionName)   
                        // console.log(isActive)
                        if(!isActive){
                            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                                detail: actionName
                            }))
                            // console.log(isActive)
                        }
                    }
                }
            }
        }
        console.log(this.activeActions)
        console.log(this.pressedKeys)
    }

    keyUp(event){
        if(this.enabled){
            for(const [actionName, actionData] of this.actions){
                if(actionData.enabled === true){
                    if(actionData.keys.includes(event.keyCode)){
                        const isActive = this.activeActions.has(actionName)
                        this.pressedKeys.delete(event.keyCode)
                        this.activeActions.delete(actionName)
                        if(!isActive){
                            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
                                detail: actionName
                            }))
                        }
                    }
                }
            }
        }
        console.log(this.activeActions)
        console.log(this.pressedKeys)
    }

    controllerOn(){
        this.enabled = true
    }

    controllerOff(){
        this.enabled = false
        this.activeActions.clear()
        this.pressedKeys.clear()
    }
}