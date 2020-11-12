import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { VoterInteractionForms } from '../components/VoterInteractionForms';
import { castBallot, chooseElection, createExitVoterInteractionAction, verifyVoter } from '../actions/castBallotActions';
import { VoterToolState } from '../models/voterStore';

export function VoterInteractionContainer() {

    const dispatch = useDispatch();

    const stateProps = useSelector((state: VoterToolState) => {
        return {
            voterId: state.castBallot.voterId,
            electionsForVoter: state.castBallot.electionsForVoter,
            voterInteractionStep: state.castBallot.voterInteractionStep,
            voterInteractionMessage: state.castBallot.voterInteractionMessage,
            electionToVoteIn: state.castBallot.electionToVoteIn,
        };
    });

    // useMemo hook allows us to NOT create these every single time
    const boundActionProps = useMemo(
        () => bindActionCreators({
        onVerifyVoter: verifyVoter,
        onChooseElection: chooseElection,
        onCastBallot: castBallot,
        onExitVoterInteraction: createExitVoterInteractionAction,
    },
    dispatch
    ), [dispatch]);

    return <VoterInteractionForms {...stateProps} {...boundActionProps} />;

}