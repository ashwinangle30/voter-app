import { Election } from "./elections";
import { Voter } from "./voters";

export type VoterToolState = {
    voterId: number;
    voterMessage: string;
    electionsForVoter: Election[],
    electionToVoteIn: Election,
};