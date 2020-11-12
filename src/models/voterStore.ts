import { Election } from "./elections";
import { Voter } from "./voters";

export type VoterToolState = {
    // This voterId is the voter who is currently interacting with the system.  
    // Consider renaming this since flow 1 will also be using voter ids for the voter crud operations
    voterId: number;
    electionsForVoter: Election[],
    // The id of the election the voter has chosen to vote in
    electionToVoteIn: Election;
    // If there is a voter interacting with the system, this is the step they are on.  Need to change this to a type
    voterInteractionStep: string;
    voterInteractionMessage: string;
};