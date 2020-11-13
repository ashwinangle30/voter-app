import { Reducer, combineReducers } from "redux";
import { VotersSort } from "../models/voters";
import {
  ManageVotersActions,
  isRefreshVotersDoneAction,
  isSortVotersAction,
  isEditVoterAction,
  isCancelVoterAction,
} from "../actions/manageVotersActions";

import { Voter } from "../models/voters";

export const votersReducer: Reducer<Voter[], ManageVotersActions> = (
    voters = [],
    action
) => {
  if (isRefreshVotersDoneAction(action)) {
    return action.payload.voters;
  }
  return voters;
};


export const votersSortReducer: Reducer<VotersSort, ManageVotersActions> = (
    votersSort = { sortCol: "id", sortDir: "asc" },
    action
) => {
  if (isSortVotersAction(action)) {
    if (
        votersSort.sortCol === action.payload.sortCol &&
        votersSort.sortDir === "asc"
    ) {
      return {
        sortCol: action.payload.sortCol,
        sortDir: "desc",
      };
    } else {
      return {
        sortCol: action.payload.sortCol,
        sortDir: "asc",
      };
    }
  }

  return votersSort;
};


export const editVoterIdReducer: Reducer<number, ManageVotersActions> = (
    editVoterId = -1,
    action
) => {
  if (isEditVoterAction(action)) {
    return action.payload.voterId;
  }

  if (isCancelVoterAction(action) || isRefreshVotersDoneAction(action)) {
    return -1;
  }

  return editVoterId;
};


export const manageVotersReducer = combineReducers({
  voters: votersReducer,
  votersSort: votersSortReducer,
  editVoterId: editVoterIdReducer,
});
