import React from 'react';
import { connect } from 'react-redux';
import AllRequestedArticlesScreen from '../article/AllRequestedArticlesComponent';
import * as commonActions from '../../redux/actions/CommonActions';
import * as postActions from '../../redux/actions/PostActions';

const AllRequestedArticles = (props: any) => {
    return <AllRequestedArticlesScreen {...props} />;
}

const mapStateToProps = (state: any) => ({
    allRequestedArticlesData: state.postsReducer.allRequestedArticlesData,
    allRequestedArticlesError: state.postsReducer.allRequestedArticlesError,
});

const mapDispatchToProps = (dispatch: any) => ({
    allRequestedArticles: () => {
        return dispatch(postActions.allRequestedArticles());
    },
    stopLoader: () => {
        return dispatch(commonActions.stopLoader());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllRequestedArticles);
