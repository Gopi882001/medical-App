import React from "react";
import { connect } from 'react-redux';
import * as postActions from '../../redux/actions/PostActions';
import MyPickedArticlesScreen from '../../screens/article/MyPickedArticlesScreen';

const MyPickedArticles = (props: any) => {
    return <MyPickedArticlesScreen {...props} />;
}
const mapStateToProps = (state: any) => ({
    myPickedArticlesData: state.postsReducer.myPickedArticlesData,
    myPickedArticlesError: state.postsReducer.myPickedArticlesError,
});

const mapDispatchToProps = (dispatch: any) => ({
    myPickedArticles: () => {
        return dispatch(postActions.myPickedArticles());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPickedArticles);
