import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from "./NavigationItem.scss";
import {NavLink} from "react-router-dom";

const navigationItem = (props) => {
    let linkStyles = [styles.link];
    if (props.active) {
        linkStyles.push(styles.linkActive);
    }
    return (
        <Fragment>
            <NavLink to={props.link} activeClassName={styles.linkActive} exact
                     className={linkStyles.join(' ')} onClick={props.onClick}>{props.children}</NavLink>
        </Fragment>
    )
}

export default navigationItem;

navigationItem.propTypes = {
    active: PropTypes.bool,
    link: PropTypes.string.isRequired,
    onClick: PropTypes.func
}
