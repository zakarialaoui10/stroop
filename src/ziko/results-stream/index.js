import {UIElement, tags} from 'ziko/ui'
import './index.css'
const {table, thead, tbody, tr, td, th, div, button} = tags
class UIResultsStream extends UIElement{
    constructor(){
        super({ element : 'div', name : 'results'})
        this.setAttr({ class : 'table-wrapper'})
        this.table = table(
            thead(
                tr(
                    th('#'),
                    th('Word'),
                    th('Ink'),
                    th('Type'),
                    th('RT (ms)'),
                    th('Correct')
                )
            ),
            tbody()
        ).setAttr({ 'aria-describedby' : 'summary'})
        this.pagination = div(
            div('Showing 0-0 of 0').setAttr({ class : 'pagination-info'}),
            div(
                button({class : 'page-btn'}, '«')
            ).setAttr({ class : 'pagination-controls'})
        )
        .setAttr({
            class : 'pagination'
        })

        this.append(
            this.table,
            this.pagination
        );
    }
}

const ResultsStream = () => new UIResultsStream()

export {
    ResultsStream
}