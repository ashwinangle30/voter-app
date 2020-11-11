import React from "react";

export const ElectionsTable = () => {

    return (
        <div id="electionTable">
            <table>
                <thead>
                <th>Name</th>
                <th>Results</th>
                </thead>
                <tbody>
                <tr>
                    <td>Primary Election 2020</td>
                    <button type="button">View Results</button>
                </tr>
                <tr>
                    <td>Midterm Election 2020</td>
                    <button type="button">View Results</button>
                </tr>
                </tbody>
            </table>
        </div>
    );
}