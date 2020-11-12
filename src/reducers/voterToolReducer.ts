import { Reducer, combineReducers } from 'redux';
import { isCastBallotDoneAction, isChooseElectionDoneAction, isVerifyVoterDoneAction, isVerifyVoterFailedDoneAction, VoterActions } from '../actions/castBallotActions';
import { Election } from '../models/elections';

export const voterIdReducer: Reducer<number, VoterActions> = (voterId = -1, action) => {
    if (isVerifyVoterDoneAction(action)) {
        return action.payload.voterId;
    } else {
        return voterId;
    }
}

export const electionReducer: Reducer<Election, VoterActions> = (electionToVoteIn = {} as Election, action) => {
    if (isChooseElectionDoneAction(action)) {
        return action.payload.election;
    } else {
        return electionToVoteIn;
    }
}

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
    } else if (isChooseElectionDoneAction(action)) {
        return "VoteInElection";
    } else if (isCastBallotDoneAction(action)) {
        return "VoteInElectionSuccessful";
    }else {
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
    electionToVoteIn: electionReducer,
});