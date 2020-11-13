import { combineReducers } from 'redux';
import { castBallotReducer } from "../reducers/castBallotReducer";
import { manageElectionsReducer } from './manageElectionsReducer';
import { manageVotersReducer } from "./manageVotersReducer";

export const voterToolReducer = combineReducers({
  castBallot: castBallotReducer,
  manageVoters: manageVotersReducer,
  manageElections: manageElectionsReducer,
});