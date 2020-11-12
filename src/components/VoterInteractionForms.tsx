import React, { ChangeEvent, useEffect, useState } from "react";
import { Election } from "../models/elections";
import { Voter } from "../models/voters";

export type IdentifyVoterProps = {    
    voterId: number,
    electionsForVoter: Election[],
    electionToVoteIn: number,
    voterInteractionStep: string,
    voterInteractionMessage: string,
    onVerifyVoter: (voterId: number) => void;
}

export function VoterInteractionForms(props: IdentifyVoterProps) {
    const [form, setForm] = useState({ inputVoterId: 0, });

    const change = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]:
                e.target.type === "number" ? Number(e.target.value) : e.target.value,
        });
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
                                    <tr key={thisElection.name}>
                                        <td>{thisElection.name}</td>
                                        <td><button type="button" onClick={() => console.log(thisElection.id + " " + props.voterId)}>Vote</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </form>);
                break;
        case "VoteInElection":
            return (
                <div>
                    <h1>TO DO List of questions for Election Primary 2020</h1>
                    <table>
                        <thead>
                            <tr>
                                <th> Question</th>
                                <th> Yes? (blank means no)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Do you like bunnies?</td><td>checkbox</td>
                                <td>Do you like kitties?</td><td>checkbox</td>
                                <td>Do you like doggies?</td><td>checkbox</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
