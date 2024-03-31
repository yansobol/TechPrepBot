
export interface QuestionDto {
    topic: string | null
    lang: string | null
    framework: string | null
    text: string
    options: { text: string, isCorrect: boolean }[] | []
    answer: string
    learnMore: string | null
}