import React from "react";

export const ElectionsResult = () => {
    return (
        <div>
            <table>
                <thead>
                    <th>Questions</th>
                    <th>Yes</th>
                    <th>No</th>
                </thead>
                <tbody>
                    <tr>
                        <td>Do you like dogs?</td>
                        <td>5</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Do you like cats?</td>
                        <td>12</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Do you like mice?</td>
                        <td>2</td>
                        <td>13</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}