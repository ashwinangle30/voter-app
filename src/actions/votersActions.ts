import { Action, AnyAction, Dispatch } from "redux";
import { Voter } from "../models/voters";


export const REFRESH_VOTERS_REQUEST_ACTION = "REFRESH_VOTERS_REQUEST_ACTION";
export const REFRESH_VOTERS_DONE_ACTION = "REFRESH_VOTERS_DONE_ACTION";
export const SORT_VOTERS_ACTION = "SORT_VOTERS_ACTION";


export type RefreshVotersRequestAction = Action<
  typeof REFRESH_VOTERS_REQUEST_ACTION
>;

export function isRefreshVotersRequestAction(
  action: AnyAction
): action is RefreshVotersRequestAction {
  return action.type === REFRESH_VOTERS_REQUEST_ACTION;
}

export type CreateRefreshVotersRequestAction = () => RefreshVotersRequestAction;

export const createRefreshVotersRequestAction: CreateRefreshVotersRequestAction = () => {
  return {
    type: REFRESH_VOTERS_REQUEST_ACTION,
  };
};

export interface RefreshVotersDoneAction
  extends Action<typeof REFRESH_VOTERS_DONE_ACTION> {
  payload: {
    voters: Voter[];
  };
}

export function isRefreshVotersDoneAction(
  action: AnyAction
): action is RefreshVotersDoneAction {
  return action.type === REFRESH_VOTERS_DONE_ACTION;
}

export type CreateRefreshVotersDoneAction = (
  voters: Voter[]
) => RefreshVotersDoneAction;

export const createRefreshVotersDoneAction: CreateRefreshVotersDoneAction = (
  voters
) => {
  return {
    type: REFRESH_VOTERS_DONE_ACTION,
    payload: {
      voters,
    },
  };
};

export const refreshVoters = () => {
  return (dispatch: Dispatch) => {
    dispatch(createRefreshVotersRequestAction());
    return fetch("http://localhost:3060/voters")
      .then((res) => res.json())
      .then((voters) => dispatch(createRefreshVotersDoneAction(voters)));
  };
};



export interface SortVotersAction extends Action<typeof SORT_VOTERS_ACTION> {
  payload: {
    sortCol: keyof Voter;
  };
}

export function isSortVotersAction(action: AnyAction): action is SortVotersAction {
  return action.type === SORT_VOTERS_ACTION;
}

export type CreateSortVotersAction = (sortCol: keyof Voter) => SortVotersAction;

export const createSortVotersAction: CreateSortVotersAction = (
    sortCol: keyof Voter
) => {
  return {
    type: SORT_VOTERS_ACTION,
    payload: {
      sortCol,
    },
  };
};


export type VotersActions = 
    | RefreshVotersDoneAction
    | SortVotersAction;
