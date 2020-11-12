import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { VoterInteractionForms } from '../components/VoterInteractionForms';
import { castBallot, chooseElection, verifyVoter } from '../actions/castBallotActions';
import { VoterToolState } from '../models/voterStore';
import { CastBallotTool } from '../components/CastBallotTool';


export function VoterInteractionContainer() {

    const dispatch = useDispatch();

    const stateProps = useSelector((state: VoterToolState) => {
        return {
            voterId: state.voterId,
            electionsForVoter: state.electionsForVoter,
            voterInteractionStep: state.voterInteractionStep,
            voterInteractionMessage: state.voterInteractionMessage,
            electionToVoteIn: state.electionToVoteIn,
        };
    });

    // useMemo hook allows us to NOT create these every single time
    const boundActionProps = useMemo(
        () => bindActionCreators({
        onVerifyVoter: verifyVoter,
        onChooseElection: chooseElection,
        onCastBallot: castBallot,
    },
    dispatch
    ), [dispatch]);

    return <VoterInteractionForms {...stateProps} {...boundActionProps} />;

}