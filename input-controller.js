class InputController{

    enabled = true
    focused = true

    static ACTION_ACTIVATED = "input-controller:action-activated"
    static ACTION_DEACTIVATED = "input-controller:action-deactivated"

    constructor(actionsToBind = {}, target=window){
        this.target = target
        this.plugins = new Set()
        this.activeActions = new Set()
        this.actionsSource = new Map()
        this.actions = new Map()
        this.target.addEventListener('focus', () => {this.attach()})
        this.target.addEventListener('blur', () => {this.detach()})
        this.bindActions(actionsToBind)
    }

    bindActions(actionsToBind){
        for(let actionName in actionsToBind){
            this.actions.set(actionName, {keys: actionsToBind[actionName], enabled: true})
        }
    }

    addPlugin(plugin){
        plugin.controller = this
        plugin.attach()
        this.plugins.add(plugin)
    }

    attach(){
        this.focused = true
        for(const plugin of this.plugins){
            plugin.attach()
        }
    }

    detach(){
        this.focused = false
        for(const plugin of this.plugins){
            plugin.detach()
        }
    }

    enableAction(actionName){
        this.actions.get(actionName).enabled = true
    }

    disableAction(actionName){
        this.actions.get(actionName).enabled = false
        this.activeActions.delete(actionName)
    }

    isActionActive(action){
        if(this.activeActions.has(action)){
            return true
        }
        else return false
    }

    actionOn(actionName, plugin){
        if(!this.actionsSource.has(actionName)){
            this.actionsSource.set(actionName, new Set())
        }
        const source = this.actionsSource.get(actionName)
        const isActive = source.size > 0
        source.add(plugin)
        this.activeActions.add(actionName)
        if(!isActive){
            this.target.dispatchEvent(new CustomEvent(InputController.ACTION_ACTIVATED, {
                detail: actionName
            }))
        }
    }

    actionOff(actionName, plugin){
        const source = this.actionsSource.get(actionName)
        source.delete(plugin)
        const isActive = source.size > 0
        if(!isActive){
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