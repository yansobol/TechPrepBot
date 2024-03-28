import { Markup } from "telegraf";

export function actionButtons() {
    return Markup.keyboard([
        Markup.button.callback('text1', 'data1'),
        Markup.button.callback('text2', 'data2'),
        Markup.button.callback('text3', 'data3'),
    ], {
        columns: 3
    }).resize()
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