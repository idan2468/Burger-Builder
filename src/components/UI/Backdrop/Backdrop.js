import PropTypes from 'prop-types'
import React, {Fragment, useRef} from 'react';
import styles from './Backdrop.css';

const backdrop = (props) => {
    let divRef = useRef();
    let backDropStyles = [styles.backdrop];
    if(props.show){
        backDropStyles.push(styles.open);
    }

    return (
        <Fragment>
            <div className={backDropStyles.join(' ')} onClick={props.onClick} ref={divRef}/>
        </Fragment>
    )
}

export default backdrop;

backdrop.propTypes = {
  onClick: PropTypes.func,
  show: PropTypes.bool
}