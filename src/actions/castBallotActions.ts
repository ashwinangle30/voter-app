import { Action, AnyAction, Dispatch } from 'redux';
import { Election, Question, QuestionResponse } from '../models/elections';
import { Voter } from '../models/voters';

export const VERIFY_VOTER_REQUEST_ACTION = "VERIFY_VOTER_REQUEST_ACTION";
export const VERIFY_VOTER_DONE_ACTION = "VERIFY_VOTER_DONE_ACTION";
export const VERIFY_VOTER_FAILED_DONE_ACTION = "VERIFY_VOTER_FAILED_DONE_ACTION";

export const CHOOSE_ELECTION_REQUEST_ACTION = "CHOOSE_ELECTION_REQUEST_ACTION";
export const CHOOSE_ELECTION_DONE_ACTION = "CHOOSE_ELECTION_DONE_ACTION";

export const CAST_BALLOT_REQUEST_ACTION = "CAST_BALLOT_REQUEST_ACTION";
export const CAST_BALLOT_DONE_ACTION = "CAST_BALLOT_DONE_ACTION";

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


//******************** */
// create interface, and action type is going to extend action from line 1
export interface ChooseElectionRequestAction extends Action<typeof CHOOSE_ELECTION_REQUEST_ACTION> {
    payload: {
        electionId: number;
    }
}

// type guard
export function isChooseElectionRequestAction(action: AnyAction): action is ChooseElectionRequestAction {
    return action.type === CHOOSE_ELECTION_REQUEST_ACTION;
}

export type CreateChooseElectionRequestAction = (electionId: number) => ChooseElectionRequestAction;

export const createChooseElectionRequestAction: CreateChooseElectionRequestAction = (electionId) => {
    return {
        type: CHOOSE_ELECTION_REQUEST_ACTION,
        payload: {
            electionId
        }
    };
};
//***********************  */

//***********************  */

export interface ChooseElectionDoneAction extends Action<typeof CHOOSE_ELECTION_DONE_ACTION> {
    payload: {
        election: Election,
    }
}

// type guard
export function isChooseElectionDoneAction(action: AnyAction): action is ChooseElectionDoneAction {
    return action.type === CHOOSE_ELECTION_DONE_ACTION;
}

export type CreateChooseElectionDoneAction = (election: Election) => ChooseElectionDoneAction;

export const createChooseElectionDoneAction: CreateChooseElectionDoneAction = (election) => {
    return {
        type: CHOOSE_ELECTION_DONE_ACTION,
        payload: {
            election,
        },
    };
};

///////////////////////////////

///CAST BALLOT SECTION///////////////////
//******************** */
// create interface, and action type is going to extend action from line 1
export interface CastBallotRequestAction extends Action<typeof CAST_BALLOT_REQUEST_ACTION> {
    payload: {
        ballotAnswers: QuestionResponse[];
        electionId: number;
    }
}

// type guard
export function isCastBallotRequestAction(action: AnyAction): action is CastBallotRequestAction {
    return action.type === CAST_BALLOT_REQUEST_ACTION;
}

export type CreateCastBallotRequestAction = (questionResponses: QuestionResponse[], electionId: number) => CastBallotRequestAction;

export const createCastBallotRequestAction: CreateCastBallotRequestAction = (ballotAnswers, electionId) => {
    return {
        type: CAST_BALLOT_REQUEST_ACTION,
        payload: {
            ballotAnswers,
            electionId
        }
    };
};
//***********************  */

//***********************  */

export interface CastBallotDoneAction extends Action<typeof CAST_BALLOT_DONE_ACTION> {
    payload: {
    }
}

// type guard
export function isCastBallotDoneAction(action: AnyAction): action is CastBallotDoneAction {
    return action.type === CAST_BALLOT_DONE_ACTION;
}

export type CreateCastBallotDoneAction = () => CastBallotDoneAction;

export const createCastBallotDoneAction: CreateCastBallotDoneAction = () => {
    return {
        type: CAST_BALLOT_DONE_ACTION,
        payload: {
        },
    };
};

///////////////////////////////


///////////////////////////////////////


export const verifyVoter = (voterId: number) => {
    console.log("verify voter!" + voterId);
    return async (dispatch: Dispatch) => {
        dispatch(createVerifyVoterRequestAction(voterId));
        const response = await fetch('http://localhost:3060/voters/' + voterId);
        if (response.status === 404) {
            console.log(" did not find voter!");
            return dispatch(createVerifyVoterFailedDoneAction(voterId));
        } else {
            console.log("success!");
            const electionsResponse = await fetch('http://localhost:3060/elections');
            const elections:Election[] = await electionsResponse.json();
            const electionsForVoter = elections.filter(election => !election.voterIds.find(thisVoterId => thisVoterId === voterId));
            return dispatch(createVerifyVoterDoneAction(voterId, electionsForVoter));
        }
    };
};

export const chooseElection = (electionId: number) => {
    console.log("choose election!" + electionId);
    return async (dispatch: Dispatch) => {
        dispatch(createChooseElectionRequestAction(electionId));
        const electionResponse = await fetch('http://localhost:3060/elections/' + electionId);
        console.log("success finding election for given id!");
        const chosenElection = await electionResponse.json();
        return dispatch(createChooseElectionDoneAction(chosenElection));
    };
}

export const castBallot = (voterId: number, electionId: number, ballotAnswers: QuestionResponse[]) => {
    console.log("in cast ballot for election!" + ballotAnswers);
    console.log(ballotAnswers);
    return async (dispatch: Dispatch) => {
        dispatch(createCastBallotRequestAction(ballotAnswers, electionId));
        // get election in order to get most recent counts
        const electionResponse = await fetch('http://localhost:3060/elections/' + electionId);

        const election: Election = await electionResponse.json();

        // put election with updated yes counts

        // map question array for this election that was returned from the server to new array, with updated yes counts
        let mappedQuestionsWithNewCounts = [...election.questions].map((thisQuestion: Question) => {
            const foundInBallotAnswers = ballotAnswers.find(questionResponse => Number(questionResponse.questionId) === thisQuestion.id);

            const updatedQuestion = { ...thisQuestion };
            if (foundInBallotAnswers !== undefined && foundInBallotAnswers.questionAnswer === "yes") {
                updatedQuestion.yesCount = thisQuestion.yesCount + 1;
            }
            return updatedQuestion;
        }
        );

        // add voterId to those who voted in election
        const voterIDCopy = [...election.voterIds];
        voterIDCopy.push(voterId);
        const updatedElection = JSON.stringify({
            id: election.id,
            name: election.name,
            questions: mappedQuestionsWithNewCounts,
            voterIds: voterIDCopy,
        });

        const res = await fetch("http://localhost:3060/elections/" + electionId, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: updatedElection,
        });

        console.log("success updating election with given id and givenAnsers!");
        // todo: filter elections to just those that the voter hasn't voted in yet
        return dispatch(createCastBallotDoneAction());
    };
}

export type VoterActions = VerifyVoterRequestAction | VerifyVoterDoneAction | VerifyVoterFailedDoneAction | ChooseElectionDoneAction | ChooseElectionRequestAction | CastBallotRequestAction | CastBallotDoneAction;