import React from "react";
import { Voter, VotersSort } from "../models/voters";
import { VoterViewRow } from "./VoterViewRow";

export  type DisplayVoterProps = {
  voters: Voter[],
  votersSort: VotersSort;
  onSortVoters: (car: keyof Voter) => void;
};

export function DisplayVoters (props: DisplayVoterProps) {

  const sortArrow = (votersSort: VotersSort, sortCol: keyof Voter) => {
    return (
        votersSort.sortCol === sortCol && (votersSort.sortDir === "asc" ? "v" : "^")
    );
  };
  
  return (
    <div>
      Display Voter
      <table id="voter-table">
        <thead>
          <tr>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("id")}>
                Id {sortArrow(props.votersSort, "id")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("firstName")}>
                First Name {sortArrow(props.votersSort, "firstName")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("lastName")}>
                Last Name {sortArrow(props.votersSort, "lastName")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("address")}>
                Address {sortArrow(props.votersSort, "address")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("city")}>
                County/City {sortArrow(props.votersSort, "city")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("birthDate")}>
                Birth Date {sortArrow(props.votersSort, "birthDate")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("email")}>
                Email {sortArrow(props.votersSort, "email")}
              </button>
            </th>
            <th className="col-header">
              <button type="button" onClick={() => props.onSortVoters("phone")}>
                Phone {sortArrow(props.votersSort, "phone")}
              </button>
            </th>
            <th className="col-header">Actions</th>
            <th className="col-header">
              {/*<button type="button" onClick={() => props.onSortVoters("selected")}>*/}
                Selected 
                {/*{sortArrow(props.votersSort, "selected")}*/}
              {/*</button>*/}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.voters.map((voter) =>
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
        <tfoot>
          <tr><th colSpan={10}>
            <button type="button" style={{float:"right"}}
                    // onClick={() => props.onSortVoters("selected")}
            >
              Delete Selected
            </button>
          </th></tr>
        </tfoot>
      </table>
    </div>
  );
};