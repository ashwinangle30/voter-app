import React from "react";
import { Voter } from "../models/voters";
import { VoterViewRow } from "./VoterViewRow";

export  type DisplayVoterProps = {
  voters: Voter[],
};

export function DisplayVoters (props: DisplayVoterProps) {
  let voters = [
    {
      "id": 7,
      "firstName": "First",
      "lastName": "Last",
      "address": "123 Main Street",
      "city": "Reno",
      "email": "first.last@gmail.com",
      "phone": "7755551212",
      "birthDate": "06/26/2020"
    }
  ];

  return (
    <div>
      Display Voter
      <table id="voter-table">
        <thead>
          <tr>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("id")}
              >
                Id 
                {/*sortArrow(props.voterSort, "id")*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("firstName")}
              >
                First Name 
                {/*sortArrow(props.voterSort, "firstName")*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("lastName")}
              >
                Last Name 
                {/*sortArrow(props.voterSort, "lastName")*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("address")}
              >
                Address 
                {/*sortArrow(props.voterSort, "address")*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("city")}
              >
                County/City 
                {/*sortArrow(props.voterSort, "city")*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("birthDate")}
              >
                Birth Date 
                {/*{sortArrow(props.voterSort, "birthDate")}*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("email")}
              >
                Email 
                {/*{sortArrow(props.voterSort, "email")}*/}
              </button>
            </th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("phone")}
              >
                Phone 
                {/*{sortArrow(props.voterSort, "phone")}*/}
              </button>
            </th>
            <th className="col-header">Actions</th>
            <th className="col-header">
              <button type="button" 
             // onClick={() => props.onSortVoters("selected")}
              >
                Select 
                {/*{sortArrow(props.voterSort, "selected")}*/}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {voters.map((voter) =>
            // voter.id === props.editVoterId ? (
            //   <VoterEditRow
            //     key={voter.id}
            //     voter={voter}
            //     onSaveVoter={props.onSaveVoter}
            //     onCancelVoter={props.onCancelVoter}
            //   />
            // ) : (
              <VoterViewRow
                key={voter.id}
                voter={voter}
                // onEditVoter={props.onEditVoter}
                // onDeleteVoter={props.onDeleteVoter}
              />
            // )
          )}
        </tbody>
      </table>
    </div>
  );
};