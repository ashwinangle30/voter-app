import React, { useMemo } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { VoterInteractionForms } from '../components/VoterInteractionForms';
import { verifyVoter } from '../actions/voterToolActions';
import { VoterToolState } from '../models/voterStore';

// import { appendCar, createAppendCarRequestAction } from "../actions/carToolActions";
// import { CarToolState } from "../models/carStore";
// import { CarForm } from '../components/CarForm';

export function VoterInteractionContainer() {

    const dispatch = useDispatch();

    const stateProps = useSelector((state: VoterToolState) => {
        return {
            voterId: state.voterId,
            voterMessage: state.voterMessage,
            electionsForVoter: state.electionsForVoter,
            electionToVoteIn: state.electionToVoteIn,
        };
    });

    // useMemo hook allows us to NOT create these every single time
    const boundActionProps = useMemo(
        () => bindActionCreators({
        onVerifyVoter: verifyVoter,
    },
    dispatch
    ), [dispatch]);

    return <VoterInteractionForms {...stateProps} {...boundActionProps} />;

}