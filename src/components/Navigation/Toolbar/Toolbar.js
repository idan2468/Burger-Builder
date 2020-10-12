import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import SideDrawerToggle from './SideDrawerToggle/SideDrawerToggle';

const toolbar = (props) => {
    return (
        <Fragment>
            <header>
                <div className={styles.container}>
                    <SideDrawerToggle onClick={props.toggleClick}/>
                    <Logo/>
                    <NavigationItems/>
                </div>
            </header>
        </Fragment>
    )
}

export default toolbar;

toolbar.propTypes = {
  toggleClick: PropTypes.func
}