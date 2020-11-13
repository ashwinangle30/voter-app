export type Item = {
    id: number;
}

export type NewElection = {
    name: string;
    voterIds: number[];
    questions: Question[];
}

export type Questions = {
    questions: Question[];
}

export type Election = NewElection & Item;

export type Question = {
    id: number;
    question: string;
    yesCount: number;
}

export type QuestionResponse = {
    questionId: string;
    questionAnswer: string;
}