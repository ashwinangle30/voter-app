import React, { useEffect, useMemo } from "react";
import {useDispatch, useSelector} from "react-redux";
import {addElection, refreshElections} from "../actions/manageElectionsActions";
import {ElectionsForm} from "../components/ElectionsForm";
import {bindActionCreators} from "redux";
import {VoterToolState} from "../models/voterStore";

export const ElectionsFormContainer = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        refreshElections()(dispatch);
    }, [dispatch]);

    const stateProps = useSelector((state: VoterToolState) => {
        return {
            electionInteractionStep: state.manageElections.electionInteractionStep,
        };
    });

    const boundActionProps = useMemo(
        () =>
            bindActionCreators(
                {
                    onAddElection: addElection,
                },
                dispatch
            ),
        [dispatch]
    );

    return (
        <ElectionsForm {...stateProps} {...boundActionProps}/>
    );

}