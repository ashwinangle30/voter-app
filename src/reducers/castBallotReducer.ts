import { Reducer, combineReducers } from 'redux';
import { isCastBallotDoneAction, isChooseElectionDoneAction, isExitVoterInteractionAction, isVerifyVoterDoneAction, isVerifyVoterFailedDoneAction, VoterActions } from '../actions/castBallotActions';
import { Election } from '../models/elections';

export const voterIdReducer: Reducer<number, VoterActions> = (voterId = -1, action) => {
    if (isVerifyVoterDoneAction(action)) {
        return action.payload.voterId;
    } else if (isExitVoterInteractionAction(action)) {
        return -1;
    } else {
        return voterId;
    }
}

export const electionReducer: Reducer<Election, VoterActions> = (electionToVoteIn = {} as Election, action) => {
    if (isChooseElectionDoneAction(action)) {
        return action.payload.election;
    } else if (isExitVoterInteractionAction(action)) {
        return {} as Election;
    } else {
        return electionToVoteIn;
    }
}

export const voterMessageReducer: Reducer<string, VoterActions> = (voterMessage = "", action) => {
    if (isVerifyVoterFailedDoneAction(action)) {
        return "Could not find voter with id: " + action.payload.failedVoterId;
    } else if (isExitVoterInteractionAction(action)) {
        return "";
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
    } else if (isExitVoterInteractionAction(action)) {
        return "VoterIndentification";
    } else {
        return voterInteractionStep;
    }
}

export const electionsForVoterReducer: Reducer<Election[], VoterActions> = (electionsForVoter = [], action) => {
    if (isVerifyVoterDoneAction(action)) {
        return action.payload.elections;
    } else if (isExitVoterInteractionAction(action)) {
        return [];
    } else {
        return electionsForVoter;
    }
}

export const castBallotReducer = combineReducers({
    voterId: voterIdReducer,
    voterInteractionMessage: voterMessageReducer,
    voterInteractionStep: voterInteractionStepReducer,
    electionsForVoter: electionsForVoterReducer,
    electionToVoteIn: electionReducer,
});

