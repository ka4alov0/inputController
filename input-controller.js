class InputController{

    enabled = true
    focused = true

    static ACTION_ACTIVATED = "input-controller:action-activated"
    static ACTION_DEACTIVATED = "input-controller:action-deactivated"

    constructor(actionsToBind = {}, target=document){
        this.target = target
        this.plugins = new Set()
        this.activeActions = new Set()
        this.pressedKeys = new Set()
        this.actions = new Map()
        this.bindActions(actionsToBind)
    }

    bindActions(actionsToBind){
        for(let actionName in actionsToBind){
            
            this.actions.set(actionName, {keys: actionsToBind[actionName], enabled: true})
            console.log(actionsToBind[actionName])
        }
        console.log(this.actions)
    }

    addPlugin(plugin){
        plugin.controller = this
        plugin.attach()
        this.plugins.add(plugin)
    }

    attach(){
        controller.focused = true
        for(const plugin of this.plugins){
            plugin.attach()
        }
    }

    detach(){
        controller.focused = false
        for(const plugin of this.plugins){
            plugin.detach()
        }
    }

    enableAction(actionName){
        this.actions.get(actionName).enabled = true
        console.log(this.actions.get(actionName).enabled)
    }

    disableAction(actionName){
        this.actions.get(actionName).enabled = false
        console.log(this.actions.get(actionName).enabled)
        this.activeActions.delete(actionName)
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

    actionOn(actionName, actionData, pressed){
        const keyboardActive = actionData.keys.keyboard.some((key) => {
            return this.isKeyPressed(key)
        })
        const mouseActive = actionData.keys.mouse.some((key) => {
            return this.isKeyPressed(key)
        })
        this.pressedKeys.add(pressed)
        this.activeActions.add(actionName)
        if(!keyboardActive && !mouseActive){
            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                detail: actionName
            }))
        }
    }

    actionOff(actionName, actionData){
        const keyboardActive = actionData.keys.keyboard.some((key) => {
            return this.isKeyPressed(key)
        })
        const mouseActive = actionData.keys.mouse.some((key) => {
            return this.isKeyPressed(key)
        })
        if(!keyboardActive && !mouseActive){
            this.activeActions.delete(actionName)
            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_DEACTIVATED, {
                detail: actionName
            }))
        }
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