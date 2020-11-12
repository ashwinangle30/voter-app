import { Election } from "./elections";
import { Voter, VotersSort } from "./voters";

// feature state.  Each feature has its own subtree on the state.  This allows reducer and workflows to work independently
export type VoterToolState = {
    castBallot: {
        voterId: number;
        electionsForVoter: Election[],
        // The id of the election the voter has chosen to vote in
        electionToVoteIn: Election;
        // If there is a voter interacting with the system, this is the step they are on.  Need to change this to a type
        voterInteractionStep: string;
        voterInteractionMessage: string;
    },
  manageVoters: {
    voters: Voter[],
    votersSort: VotersSort,
  }
};
