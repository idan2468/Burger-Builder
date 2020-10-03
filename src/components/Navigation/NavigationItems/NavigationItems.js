import React, {Fragment} from 'react';
import styles from './NavigationItems.scss'
import NavigationItem from './NavigationItem/NavigationItem'
import {connect} from "react-redux";
import * as actions from '../../../store/actions/actions';
import {withRouter} from "react-router";

const navigationItems = (props) => {

    const logout = async () => {
        await props.logout();
        props.history.replace('/auth');
    }
    let containerStyle = styles.container;
    if (props.side) {
        containerStyle = styles.sideContainer
    }
    let authItem = <NavigationItem link={'/auth'}>Login</NavigationItem>;
    let orders = null;
    if (props.isLogon) {
        authItem = <NavigationItem link={'/auth'} onClick={logout}>Logout</NavigationItem>
        orders = <NavigationItem link={'/orders'}>Orders</NavigationItem>

    }

    return (
        <Fragment>
            <div className={containerStyle}>
                <NavigationItem link={'/'}>Main</NavigationItem>
                {orders}
                {authItem}
            </div>
        </Fragment>
    )
}
const mapStateToProps = (state) => {
    return {
        isLogon: state.auth.logon
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(actions.logout({expireTime: 0}))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(navigationItems));