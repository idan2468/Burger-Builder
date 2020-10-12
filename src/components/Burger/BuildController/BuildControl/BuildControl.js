import PropTypes from 'prop-types'
import React, {Fragment, useRef} from 'react';
import styles from './BuildControl.css';

const buildControl = (props) => {
    const inputCountRef = useRef(null);

    const plusHandler = () => {
        let newValue = Number(inputCountRef.current.value);
        newValue++;
        inputCountRef.current.value = newValue;
        props.onClick(newValue, props.name);
    }
    const minusHandler = () => {
        let newValue = Number(inputCountRef.current.value);
        if (newValue > 0) {
            newValue--;
            inputCountRef.current.value = newValue;
            props.onClick(newValue, props.name);
        }
    }
    const deleteEventHandler = (e) => {
        if (e.keyCode === 8 && e.target.value < 10) {
            props.onClick(0, props.name);
        }
    }
    let minusIsDisabled = props.count === 0;
    let controlMinusStyle = [styles.controlMinus];
    if (minusIsDisabled) {
        controlMinusStyle.push(styles.controlMinusDisabled);
    }
    return (
        <Fragment>
            <div className={styles.controlDiv}>
                <label className={styles.labelStyle}>{props.label ? props.label : props.name}</label>
                <div className={styles.controlsDiv}>
                    <a onClick={() => plusHandler()} className={styles.controlPlus}>+</a>
                    <input type="number" className={styles.inputCount} value={props.count} ref={inputCountRef}
                           onChange={(event) => props.onClick(Number(event.target.value), props.name)}
                           onKeyDown={deleteEventHandler}/>
                    <a onClick={() => minusHandler()}
                       className={controlMinusStyle.join(" ")}>-</a>
                </div>
            </div>
        </Fragment>
    )
}

export default buildControl;

buildControl.propTypes = {
    count: PropTypes.number,
    label: PropTypes.string,
    name: PropTypes.string,
    onClick: PropTypes.func
}
