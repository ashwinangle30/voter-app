import { Action, AnyAction, Dispatch } from 'redux';
import { Election } from '../models/elections';
import { Voter } from '../models/voters';

export const VERIFY_VOTER_REQUEST_ACTION = "VERIFY_VOTER_REQUEST_ACTION";
export const VERIFY_VOTER_DONE_ACTION = "VERIFY_VOTER_DONE_ACTION";
export const VERIFY_VOTER_FAILED_DONE_ACTION = "VERIFY_VOTER_FAILED_DONE_ACTION";


//******************** */
// create interface, and action type is going to extend action from line 1
export interface VerifyVoterRequestAction extends Action<typeof VERIFY_VOTER_REQUEST_ACTION> {
    payload: {
        voterId: number;
    }
}

// type guard
export function isVerifyVoterRequestAction(action: AnyAction): action is VerifyVoterRequestAction {
    return action.type === VERIFY_VOTER_REQUEST_ACTION;
}

export type CreateVerifyVoterRequestAction = (voterId: number) => VerifyVoterRequestAction;

export const createVerifyVoterRequestAction: CreateVerifyVoterRequestAction = (voterId) => {
    return {
        type: VERIFY_VOTER_REQUEST_ACTION,
        payload: {
            voterId
        }
    };
};
//***********************  */

export interface VerifyVoterDoneAction extends Action<typeof VERIFY_VOTER_DONE_ACTION> {
    payload: {
        voterId: number,
        elections: Election[],
    }
}

// type guard
export function isVerifyVoterDoneAction(action: AnyAction): action is VerifyVoterDoneAction {
    return action.type === VERIFY_VOTER_DONE_ACTION;
}

export type CreateVerifyVoterDoneAction = (voterId: number, elections: Election[]) => VerifyVoterDoneAction;

export const createVerifyVoterDoneAction: CreateVerifyVoterDoneAction = (voterId, elections) => {
    return {
        type: VERIFY_VOTER_DONE_ACTION,
        payload: {
            voterId,
            elections,
        },
    };
};

///////////////////////////////
export interface VerifyVoterFailedDoneAction extends Action<typeof VERIFY_VOTER_FAILED_DONE_ACTION> {
    payload: {
        failedVoterId: number,
    }
}

// type guard
export function isVerifyVoterFailedDoneAction(action: AnyAction): action is VerifyVoterFailedDoneAction {
    return action.type === VERIFY_VOTER_FAILED_DONE_ACTION;
}

export type CreateVerifyVoterFailedDoneAction = (failedVoterId: number) => VerifyVoterFailedDoneAction;

export const createVerifyVoterFailedDoneAction: CreateVerifyVoterFailedDoneAction = (pFailedVoterId) => {
    return {
        type: VERIFY_VOTER_FAILED_DONE_ACTION,
        payload: {
            failedVoterId: pFailedVoterId
        },
    };
};
//////////////////////////////


export const verifyVoter = (id: number) => {
    console.log("verify voter!" + id);
    return async (dispatch: Dispatch)  => {
        dispatch(createVerifyVoterRequestAction(id));
        const response = await fetch('http://localhost:3060/voters/' + id);
        if (response.status === 404) {
            console.log(" did not find voter!");
            return dispatch(createVerifyVoterFailedDoneAction(id));
        } else {
            console.log("success!");
            const electionsResponse = await fetch('http://localhost:3060/elections');
            const elections = await electionsResponse.json();
            // todo: filter elections to just those that the voter hasn't voted in yet
            return dispatch(createVerifyVoterDoneAction(id, elections));
        }
    };
};

export type VoterActions = VerifyVoterRequestAction | VerifyVoterDoneAction | VerifyVoterFailedDoneAction;