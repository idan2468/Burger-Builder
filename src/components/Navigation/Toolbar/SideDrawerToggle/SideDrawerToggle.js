import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './SideDrawerToggle.scss';
import BarImage from '../../../../assets/images/bars-solid.svg';
const sideDrawerToggle = (props) => {
    return (
        <Fragment>
            <div className={styles.container} onClick={props.onClick}><img src={BarImage} alt={"Bar"}/></div>
        </Fragment>
    )
}

export default sideDrawerToggle;

sideDrawerToggle.propTypes = {
  onClick: PropTypes.func
}