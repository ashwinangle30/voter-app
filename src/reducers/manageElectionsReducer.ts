import { Reducer, combineReducers } from 'redux';
import { isRefreshElectionsDoneAction, isRetrieveElectionDoneAction, ManageElectionActions } from '../actions/manageElectionsActions';
import { Election } from '../models/elections';

export const electionsReducer: Reducer<Election[], ManageElectionActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;
    }
}

export const electionReducer: Reducer<Election, ManageElectionActions> = (election = {} as Election, action) => {
    if (isRetrieveElectionDoneAction(action)) {
        return action.payload.election;
    } else {
        return election;
    }
}

export const electionInteractionStepReducer: Reducer<string, ManageElectionActions> = (electionInteractionStep = "ViewAllElections", action) => {
    if (isRetrieveElectionDoneAction(action)) {
        return "ViewElectionResults";
    } else if (isRefreshElectionsDoneAction(action)) {
        return "ViewAllElections";
    } else {
        return electionInteractionStep;
    }
}

export const manageElectionsReducer = combineReducers({
    elections: electionsReducer,
    election: electionReducer,
    electionInteractionStep: electionInteractionStepReducer,
});

