import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import NavigationItems from "../NavigationItems/NavigationItems";

const sideDrawer = (props) => {
    let sliderStyles = [styles.slider];
    if (props.show) {
        sliderStyles.push(styles.open)
    } else if (props.show === false) {
        sliderStyles.push(styles.close);
    }
    return (
        <Fragment>
            <Backdrop show={props.show} onClick={props.onClick}/>
            <div className={sliderStyles.join(' ')} onClick={props.onClick}>
                <NavigationItems side/>
            </div>
        </Fragment>
    )
}

export default sideDrawer;

sideDrawer.propTypes = {
    show: PropTypes.bool
}