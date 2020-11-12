export type Election = {
    id: number;
    name: string;
    voterIds: number[];
    questions: Question[];
}

export type Question = {
    id: number;
    question: string;
    yesCount: number;
}

export type QuestionResponse = {
    questionId: string;
    questionAnswer: string;
}