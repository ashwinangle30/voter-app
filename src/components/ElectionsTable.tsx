import React from "react";
import { Election } from "../models/elections";
import { electionsForVoterReducer } from "../reducers/castBallotReducer";

export type ElectionProps = {
    elections: Election[];
    onRefreshElections: () => void;
}

export const ElectionsTable = (props: ElectionProps) => {

    return (
        <div id="electionTable">
            <table>
                <thead>
                <th>Name</th>
                <th>Results</th>
                </thead>
                <tbody>
                {props.elections.map((thisElection) =>
                                    <tr key={thisElection.id}>
                                        <td>{thisElection.name}</td>
                                        <td><button type="button" onClick={() => console.log("Trying to see results for election " + thisElection.id)}>Results</button></td>
                                    </tr>
                                )}
                </tbody>
            </table>
        </div>
    );
}