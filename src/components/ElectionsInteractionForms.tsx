import React from "react";
import { Election, Question } from "../models/elections";

export type ElectionProps = {
    elections: Election[];
    election: Election;
    electionInteractionStep: string,
    onRefreshElections: () => void;
    onShowResultsForElection: (electionId: number) => void;
}

export const ElectionsInteractionForms = (props: ElectionProps) => {

    switch (props.electionInteractionStep) {
        case "ViewElectionResults":
        return (
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Questions</th>
                                <th>Yes</th>
                                <th>No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.election.questions.map((thisQuestion:Question) => 
                            <tr key={thisQuestion.id}>
                                <td>{thisQuestion.question}</td>
                                <td>{thisQuestion.yesCount}</td>
                                <td>{props.election.voterIds.length - thisQuestion.yesCount}</td>
                            </tr>
                            )}
                        </tbody>
                    </table>
                    <div>
                        <button type="button" onClick={() => props.onRefreshElections()}>Back to list of elections</button>
                    </div>
                </div>
            )
        case "ViewAllElections":
        default:
            return (
                <div id="electionTable">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {props.elections.map((thisElection) =>
                                            <tr key={thisElection.id}>
                                                <td>{thisElection.name}</td>
                                                <td><button type="button" onClick={() => props.onShowResultsForElection(thisElection.id)}>Results</button></td>
                                            </tr>
                                        )}
                        </tbody>
                    </table>
                </div>
            );

    }
}