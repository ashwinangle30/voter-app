import React, { ChangeEvent, useState } from "react";
import { Election, QuestionResponse } from "../models/elections";

export type IdentifyVoterProps = {
    voterId: number,
    electionsForVoter: Election[],
    electionToVoteIn: Election,
    voterInteractionStep: string,
    voterInteractionMessage: string,
    onVerifyVoter: (voterId: number) => void;
    onChooseElection: (electionId: number) => void;
    onCastBallot: (voterId: number, electionId: number, ballotData: QuestionResponse[]) => void;
    onExitVoterInteraction: () => void;
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
        const copyOfCheckboxAnswers = [...checkBoxAnswers];

        // if the voter has already checked this box, we have to remove his/her answer from the array; otherwise, it will be counted again every time he/she clicks this checkbox
        const foundQuestionResponseIndex = copyOfCheckboxAnswers.findIndex(thisQuestionResponse => thisQuestionResponse.questionId === e.target.name);
        if (foundQuestionResponseIndex !== undefined && foundQuestionResponseIndex !== -1) {
             copyOfCheckboxAnswers.splice(foundQuestionResponseIndex, 1);
        }
        setCheckBoxAnswers([
            ...copyOfCheckboxAnswers,
            {
                questionId: e.target.name,
                questionAnswer: !!e.target.checked ? "yes" : "no",
            }
        ]);
    };

    const findCheckedValue = (questionId: number, responseArray: QuestionResponse[]) => {
        const foundQuestionResponse = checkBoxAnswers.find(thisQuestionResponse => thisQuestionResponse.questionId === questionId.toString());

        if (foundQuestionResponse !== undefined && foundQuestionResponse?.questionAnswer === "yes") {
            return true;
        } else {
            return false;
        }
    }

    const resetForm = () => setForm(
        { inputVoterId: 0, }
    );

    const resetCheckBoxes = () => setCheckBoxAnswers(
         [] 
    );

    const resetVoterInteraction = () => {
        resetForm();
        resetCheckBoxes();
        props.onExitVoterInteraction();
    }

    switch (props.voterInteractionStep) {
        case "AvailableElections":
            return (
                <form>
                    <div>
                        <h3>List of elections for voter {props.voterId}</h3>
                        { props.electionsForVoter.length === 0 ? "You have voted in all available elections" : ""}
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
                    <div>
                        <button type="button" onClick={() => resetVoterInteraction()}>Back to main voting screen</button>
                    </div>
                </form>);
        case "VoteInElection":
            return (
                <form>
                    <div>
                        <h3>Welcome to voting!  Please vote in election {props.electionToVoteIn.name}</h3>
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
                                        <td><input type="checkbox"
                                            id={thisQuestion.id.toString()}
                                            name={thisQuestion.id.toString()}
                                            checked={findCheckedValue(thisQuestion.id, checkBoxAnswers)}
                                            onChange={checkBoxChange} /></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        <button type="button" onClick={() => props.onCastBallot(props.voterId, props.electionToVoteIn.id, checkBoxAnswers)}>Vote</button>
                    </div>
                    <div>
                        <button type="button" onClick={() => resetVoterInteraction()}>Back to main voting screen</button>
                    </div>
                </form>
            );
        case "VoteInElectionSuccessful":
            return (
                <div>Ballot has been cast! <br />
                    <button type="button" onClick={() => resetVoterInteraction()}>Back to main voting screen</button>
                </div>
            );
        case "VoterIndentification":
        case "VoterValidationFailed":
        default:
            return (
                <form>
                    <div className="errorMessage">{props.voterInteractionMessage}</div>
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
    }
}
