import { Action, AnyAction, Dispatch } from 'redux';
import { Election } from '../models/elections';

export const REFRESH_ELECTIONS_REQUEST_ACTION = "REFRESH_ELECTIONS_REQUEST_ACTION";
export const REFRESH_ELECTIONS_DONE_ACTION = "REFRESH_ELECTIONS_DONE_ACTION";

export const RETRIEVE_ELECTION_REQUEST_ACTION = "RETRIEVE_ELECTION_REQUEST_ACTION";
export const RETRIEVE_ELECTION_DONE_ACTION = "RETRIEVE_ELECTION_DONE_ACTION";

export type RefreshElectionsRequestAction = Action<typeof REFRESH_ELECTIONS_REQUEST_ACTION>;

export function isRefreshElectionsRequestAction(action: AnyAction): action is RefreshElectionsRequestAction {
  return action.type === REFRESH_ELECTIONS_REQUEST_ACTION;
}

export type CreateRefreshElectionsRequestAction = () => RefreshElectionsRequestAction;

export const createRefreshElectionsRequestAction: CreateRefreshElectionsRequestAction = () => {
  return {
    type: REFRESH_ELECTIONS_REQUEST_ACTION,
  };
};

export interface RefreshElectionsDoneAction
  extends Action<typeof REFRESH_ELECTIONS_DONE_ACTION> {
  payload: {
    elections: Election[];
  };
}

export function isRefreshElectionsDoneAction(
  action: AnyAction
): action is RefreshElectionsDoneAction {
  return action.type === REFRESH_ELECTIONS_DONE_ACTION;
}

export type CreateRefreshElectionsDoneAction = (elections: Election[]) => RefreshElectionsDoneAction;

export const createRefreshElectionsDoneAction: CreateRefreshElectionsDoneAction = (elections) => {
  return {
    type: REFRESH_ELECTIONS_DONE_ACTION,
    payload: {
        elections,
    },
  };
};

///////////////////////////
//******************** */
// create interface, and action type is going to extend action from line 1
export interface RetrieveElectionRequestAction extends Action<typeof RETRIEVE_ELECTION_REQUEST_ACTION> {
    payload: {
        electionId: number;
    }
}

// type guard
export function isRetrieveElectionRequestAction(action: AnyAction): action is RetrieveElectionRequestAction {
    return action.type === RETRIEVE_ELECTION_REQUEST_ACTION;
}

export type CreateRetrieveElectionRequestAction = (electionId: number) => RetrieveElectionRequestAction;

export const createRetrieveElectionRequestAction: CreateRetrieveElectionRequestAction = (electionId) => {
    return {
        type: RETRIEVE_ELECTION_REQUEST_ACTION,
        payload: {
            electionId
        }
    };
};
//***********************  */

export interface RetrieveElectionDoneAction extends Action<typeof RETRIEVE_ELECTION_DONE_ACTION> {
    payload: {
        election: Election,
    }
}

// type guard
export function isRetrieveElectionDoneAction(action: AnyAction): action is RetrieveElectionDoneAction {
    return action.type === RETRIEVE_ELECTION_DONE_ACTION;
}

export type CreateRetrieveElectionDoneAction = (election: Election) => RetrieveElectionDoneAction;

export const createRetrieveElectionDoneAction: CreateRetrieveElectionDoneAction = (election) => {
    return {
        type: RETRIEVE_ELECTION_DONE_ACTION,
        payload: {
            election
        },
    };
};

///////////////////////////////


///////////////////////////

export const refreshElections = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshElectionsRequestAction());
    return fetch("http://localhost:3060/elections")
      .then((res) => res.json())
      .then((elections) => dispatch(createRefreshElectionsDoneAction(elections)));
  };
};

export const retrieveElection = (electionId: number) => {
    return (dispatch: Dispatch) => {
        dispatch(createRefreshElectionsRequestAction());
        return fetch("http://localhost:3060/elections/" + electionId)
          .then((res) => res.json())
          .then((election) => dispatch(createRetrieveElectionDoneAction(election)));
      };
}

export type ManageElectionActions = RefreshElectionsDoneAction | RetrieveElectionDoneAction;