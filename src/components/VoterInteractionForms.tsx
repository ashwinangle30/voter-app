import React, { ChangeEvent, useEffect, useState } from "react";
import { Election, QuestionResponse } from "../models/elections";
import { Voter } from "../models/voters";

export type IdentifyVoterProps = {    
    voterId: number,
    electionsForVoter: Election[],
    electionToVoteIn: Election,
    voterInteractionStep: string,
    voterInteractionMessage: string,
    onVerifyVoter: (voterId: number) => void;
    onChooseElection: (electionId: number) => void;
    onCastBallot: (electionId: number, ballotData: QuestionResponse[]) => void;
}

export function VoterInteractionForms(props: IdentifyVoterProps) {
    const [form, setForm] = useState({ inputVoterId: 0, });
    const [checkBoxAnswers, setCheckBoxAnswers] = useState<QuestionResponse[]>([]);

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
    };

    const checkBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckBoxAnswers([
            ...checkBoxAnswers,
            {
                questionId: e.target.name, 
                questionAnswer: e.target.value
            }
        ]);
    };

    const resetForm = () => setForm({ inputVoterId: 0, });

    switch (props.voterInteractionStep) {
        case "AvailableElections":
            console.log("Found voter, and voter has elections!");
            console.log(props.electionsForVoter);
            return (
                <form>
                    <div>
                        <h1>List of elections for voter {props.voterId}</h1>
                        <table>
                            <tbody>
                                {props.electionsForVoter.map((thisElection) =>
                                    <tr key={thisElection.id}>
                                        <td>{thisElection.name}</td>
                                        <td><button type="button" onClick={() => props.onChooseElection(thisElection.id)}>Vote</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </form>);
                break;
        case "VoteInElection":
            return (
                <form>
                    <div>
                        <h1>Welcome to voting!  Please vote in election {props.electionToVoteIn.name}</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th> Question</th>
                                    <th> Yes? (blank means no)</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {props.electionToVoteIn.questions.map((thisQuestion) =>
                                        <tr key={thisQuestion.id}>
                                            <td>{thisQuestion.question}</td>
                                            <td><input type="checkbox" id={thisQuestion.id.toString()} name={thisQuestion.id.toString()} value="yes" onChange={checkBoxChange}/></td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => props.onCastBallot(props.electionToVoteIn.id, checkBoxAnswers)}>Vote</button>
                    </div>
                </form>
            );
            break;
        case "VoteInElectionSuccessful":
            return (
                <div>Ballot has been cast!</div>
            );
            break;
        case "VoterIndentification":
        case "VoterValidationFailed":
        default:
                return (
                    <form>
                        <div>{props.voterInteractionMessage}</div>
                        <div>
                            <label htmlFor="voter-id-input">Please enter your voter id</label>
                            <input
                                type="number"
                                id="voter-id-input"
                                name="inputVoterId"
                                value={form.inputVoterId}
                                onChange={change}
                            />
                        </div>
                        <button type="button" onClick={() => props.onVerifyVoter(form.inputVoterId)}>
                            Show Available Elections
              </button>
                    </form>
                );
                break;
    }
}
