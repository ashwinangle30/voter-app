import React, {useState} from "react";
import './Elections.css'
import {NewElection} from "../models/elections";
import {useForm} from "../hooks/useForm";


export type ElectionsFormProps = {
    onAddElection: (newElection: NewElection) => void,
    electionInteractionStep: string
}

export const ElectionsForm = (props: ElectionsFormProps) => {

    const [electionForm, change, resetElectionForm] = useForm({
        name: "",
        questions: [],
        voterIds: []
    });

    const [inputList, setInputList] = useState([{
        dynamicQuestion : ""
    }])

    const parseDynamicQuestions = (questions: { dynamicQuestion: string }[]) => {
        let count = 1;
        return questions.map(question => {
            return {
                question : question.dynamicQuestion,
                id: count++,
                yesCount: 0
            };
        })
    }

    // handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
        const { value } = e.target;
        const list = [...inputList];
        list[index]["dynamicQuestion"] = value;
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList, { dynamicQuestion: ""}]);
    };

    // handle click event of the Remove button
    const handleRemoveClick = (index: number) => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };


    const onAddElection = () => {
        const questions = parseDynamicQuestions(inputList);
        props.onAddElection({
            name: electionForm.name,
            voterIds: [],
            questions
        });

        resetElectionForm();
        setInputList([{
            dynamicQuestion : ""
        }])
    }

    let electionFormContent = <div></div>;

    if(props.electionInteractionStep === "ViewAllElections"){
        electionFormContent = (
            <form>
                <fieldset>
                    <legend>Election Form</legend>
                    <div id="electionForm" className="electionForm">
                        <div>
                            <label htmlFor="electionName">Name</label>
                            <input type="text" id="name" name="name" value={electionForm.name} onChange={change}/>
                        </div>
                        <div>
                            <label htmlFor="questions">Questions</label>
                            {inputList.map((input, index) => {
                                return (
                                    <div className="questionsContainer" key={index}>
                                        <textarea name="dynamicQuestion" value={input.dynamicQuestion} rows={2} cols={50} onChange={e => handleInputChange(e, index)}/>
                                        <div className="buttonsDiv">
                                            {inputList.length !== 1 && <button type="button" onClick={() => handleRemoveClick(index)}>-</button>}
                                            {inputList.length - 1 === index && <button type="button" onClick={handleAddClick}>+</button>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <button type="button" onClick={onAddElection}>
                                Submit
                            </button>
                        </div>
                    </div>
                </fieldset>
            </form>
        )
    }
    return (
        electionFormContent
    )
}