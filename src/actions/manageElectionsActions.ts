import { Action, AnyAction, Dispatch } from 'redux';
import { Election } from '../models/elections';

export const REFRESH_ELECTIONS_REQUEST_ACTION = "REFRESH_ELECTIONS_REQUEST_ACTION";
export const REFRESH_ELECTIONS_DONE_ACTION = "REFRESH_ELECTIONS_DONE_ACTION";

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

export const refreshElections = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshElectionsRequestAction());
    return fetch("http://localhost:3060/elections")
      .then((res) => res.json())
      .then((elections) => dispatch(createRefreshElectionsDoneAction(elections)));
  };
};

export type ManageElectionActions = RefreshElectionsDoneAction;