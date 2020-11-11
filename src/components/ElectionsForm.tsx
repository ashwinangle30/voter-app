import React from "react";

export const ElectionsForm = () => {
    return (
        <div id="electionForm">
            <form>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"/>
                </div>
                <div>
                    <div>
                        <label htmlFor="questions">Questions</label>
                    </div>
                    <div>
                        <textarea id="questions" name="questions" rows={4} cols={50}/>
                    </div>
                </div>
                <div>
                    <button type="button">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}