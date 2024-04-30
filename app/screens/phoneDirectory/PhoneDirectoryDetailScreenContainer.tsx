import React from "react";
import { connect } from 'react-redux';
import * as contactsActions from '../../redux/actions/contactsActions';
import PhoneDirectoryDetailScreenComponent from "./PhoneDirectoryDetailScreenComponent";

const PhoneDirectoryScreen = (props: any) => {
    return <PhoneDirectoryDetailScreenComponent {...props} />;
}
const mapStateToProps = (state: any) => ({
    contactsOfCategoryData: state.contactsReducer.contactsOfCategoryData,
    contactsOfCategoryError: state.contactsReducer.contactsOfCategoryError,
});

const mapDispatchToProps = (dispatch: any) => ({
    getEntities: (params: any) => {
        return dispatch(contactsActions.getEntities(params));
    },
    getContactsOfCategories: (params: any) => {
        return dispatch(contactsActions.getContactsOfCategories(params));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneDirectoryScreen);
