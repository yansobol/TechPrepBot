import { Markup } from "telegraf";

export function actionButtons() {
    return Markup.keyboard([
        Markup.button.text('text1'),
        Markup.button.callback('text2', 'data2'),
        Markup.button.callback('text3', 'data3'),
    ], {
        columns: 3
    }).resize()
}

export function langButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('Java', 'java'),
        Markup.button.callback('Go', 'go'),
        Markup.button.callback('Python', 'python')
    ], {
        columns: 3,
    })
}
export function questionButtons(id: number) {

    try {
        return Markup.inlineKeyboard([
            Markup.button.callback('Answer', `${id}`),
            Markup.button.callback('Next', 'next'),
        ],
            {
                columns: 2,
            })

    } catch (error) {
        console.error(error)
    }
}

export function frameworkButtons() {
    return Markup.inlineKeyboard([
        Markup.button.callback('React', 'react'),
        Markup.button.callback('Vue.js', 'vuejs'),
        Markup.button.callback('Angular', 'angular')
    ], {
        columns: 3
    })
}

export function actionButtons2() {
    return Markup.keyboard([
        Markup.button.callback('2text1', '2data1'),
        Markup.button.callback('2text2', '2data2'),
        Markup.button.callback('2text2', '2data2')
    ], {
        columns: 3
    }).resize()
}

export function actionButtons3() {
    return Markup.keyboard([
        Markup.button.callback('3text1', '2data1'),
        Markup.button.callback('3text2', '2data2'),
        Markup.button.callback('3text2', '2data2')
    ], {
        columns: 3
    }).resize()
}