import React from "react";
import { connect } from 'react-redux';
import * as authActions from '../../redux/actions/authActions';
import ChangeGoalScreen from "./ChangeGoalScreenComponent";

const ChangeGoal = (props: any) => {
    return <ChangeGoalScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    setGoalsData: state.authReducer.setGoalsData,
    setGoalsError: state.authReducer.setGoalsError,
});

const mapDispatchToProps = (dispatch: any) => ({
    setGoals: (params: any) => {
        return dispatch(authActions.setGoals(params));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeGoal);
