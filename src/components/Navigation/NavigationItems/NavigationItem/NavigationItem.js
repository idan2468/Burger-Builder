import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from "./NavigationItem.scss";

const navigationItem = (props) => {
    let linkStyles = [styles.link];
    if(props.active){
        linkStyles.push(styles.linkActive);
    }
    return (
        <Fragment>
            <a href={props.link} className={linkStyles.join(' ')}>{props.children}</a>
        </Fragment>
    )
}

export default navigationItem;

navigationItem.propTypes = {
  active: PropTypes.bool,
  link: PropTypes.string
}