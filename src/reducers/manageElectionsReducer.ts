import { Reducer, combineReducers } from 'redux';
import { isRefreshElectionsDoneAction, ManageElectionActions } from '../actions/manageElectionsActions';
import { Election } from '../models/elections';

export const electionsReducer: Reducer<Election[], ManageElectionActions> = (elections = [], action) => {
    if (isRefreshElectionsDoneAction(action)) {
        return action.payload.elections;
    } else {
        return elections;
    }
}

export const manageElectionsReducer = combineReducers({
    elections: electionsReducer,
});

