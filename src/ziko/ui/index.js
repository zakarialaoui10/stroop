import { UIElement, tags } from "ziko/ui/index.js";
import './index.css'
const { div } = tags

class UIStroop extends UIElement{
    constructor(){
        super({ element : 'div', name : 'stroop'})
        this.setAttr({ class : 'wrap'})

        this.stimulus = div('Press Start').setAttr({
            class : 'stimulus',
            'aria-live' : 'polite'
        })

        this.result_sumary = div(
            stat('Trials: 0'),
            stat('Avg RT: — ms'),
            stat('Accuracy: — %')
        ).setAttr({ class : 'results-summary'})

        this.append(
            div(
                this.stimulus,
                this.result_sumary
            ).setAttr({class : 'card', role : 'main', 'aria-labelledby' : 'title'})
        )

    }
}

const stat = (text) => tags.div(text).setAttr({class : 'stat'})

const Stroop = () => new UIStroop()
export{
    UIStroop, 
    Stroop
}