import { Reducer, combineReducers } from 'redux';
import { isCastBallotDoneAction, isChooseElectionDoneAction, isExitVoterInteractionAction, isVerifyVoterDoneAction, isVerifyVoterFailedDoneAction, VoterActions } from '../actions/castBallotActions';
import { Election } from '../models/elections';
import { castBallotReducer } from "../reducers/castBallotReducer";
import { manageVotersReducer } from "./votersReducer";

export const voterToolReducer = combineReducers({
  castBallot: castBallotReducer,
  manageVoters: manageVotersReducer,
});