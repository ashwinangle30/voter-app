import { Reducer, combineReducers } from "redux";
import { VotersSort } from "../models/voters";
import {
  VotersActions,
  isRefreshVotersDoneAction,
  isSortVotersAction,
} from "../actions/votersActions";

import { Voter } from "../models/voters";

export const votersReducer: Reducer<Voter[], VotersActions> = (
    voters = [],
    action
) => {
  if (isRefreshVotersDoneAction(action)) {
    return action.payload.voters;
  }
  return voters;
};


export const votersSortReducer: Reducer<VotersSort, VotersActions> = (
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


export const manageVotersReducer = combineReducers({
  voters: votersReducer,
  votersSort: votersSortReducer,
});
