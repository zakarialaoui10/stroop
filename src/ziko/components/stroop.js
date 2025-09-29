import { UIElement } from "ziko/ui";

class UIStroop extends UIElement{
    constructor(){
        super({ element : 'div', name : 'stroop'})
    }
}


const Stroop = () => new UIStroop()

export {
    UIStroop,
    Stroop
}