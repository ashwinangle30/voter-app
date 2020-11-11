import {Question} from "./question";

export type Election = {
    id: string
    name: string,
    voterIds: number[],
    questions: Question[]
}