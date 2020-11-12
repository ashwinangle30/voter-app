import { Reducer, combineReducers } from 'redux';
import { isVerifyVoterDoneAction, isVerifyVoterFailedDoneAction, VoterActions } from '../actions/voterToolActions';
import { Election } from '../models/elections';

export const voterIdReducer: Reducer<number, VoterActions> = (voterId = -1, action) => {
    if (isVerifyVoterDoneAction(action)) {
        return action.payload.voterId;
    } else {
        return voterId;
    }
}


// export const electionIdReducer: Reducer<number, VoterActions> = (electionToVoteIn = -1, action) => {
//     if (isChooseElectionToVoteInDoneAction(action)) {
//         return action.payload.electionToVoteIn;
//     } else {
//         return electionToVoteIn;
//     }
// }


export const voterMessageReducer: Reducer<string, VoterActions> = (voterMessage = "", action) => {
    if (isVerifyVoterFailedDoneAction(action)) {
        return "Could not find voter with id: " + action.payload.failedVoterId;
    } else {
        return voterMessage;
    }
}

export const voterInteractionStepReducer: Reducer<string, VoterActions> = (voterInteractionStep = "VoterIndentification", action) => {
    if (isVerifyVoterDoneAction(action)) {
        return "AvailableElections";
    } else if (isVerifyVoterFailedDoneAction(action)) {
        return "VoterValidationFailed";
    } else {
        return voterInteractionStep;
    }
}

export const electionsForVoterReducer: Reducer<Election[], VoterActions> = (electionsForVoter = [], action) => {
    if (isVerifyVoterDoneAction(action)) {
        return action.payload.elections;
    } else {
        return electionsForVoter;
    }
}

export const voterToolReducer = combineReducers({
    voterId: voterIdReducer,
    voterInteractionMessage: voterMessageReducer,
    voterInteractionStep: voterInteractionStepReducer,
    electionsForVoter: electionsForVoterReducer,
//    electionToVoteIn: electionIdReducer,
});