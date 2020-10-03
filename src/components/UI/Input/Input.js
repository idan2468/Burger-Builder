import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Input.scss';

const input = (props) => {
    let inputStyle = [];
    if(!props.valid){
        inputStyle.push(styles.invalid)
    }
    if (props.inputStyle) {
        inputStyle.push(props.inputStyle);
    }
    let inputElement;
    let optionsElements = props.options.map(option => <option key={option} value={option}>{option}</option>);
    switch (props.inputType) {
        case 'input':
            inputElement =
                <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value}
                       onChange={props.onChange} className={inputStyle.join(' ')}/>;
            break
        case 'select':
            inputElement = (
                <select name={props.name} placeholder={props.placeholder} value={props.value}
                        onChange={props.onChange} className={inputStyle.join(' ')}>
                    {optionsElements}
                </select>
            );
            break;
        default:
            inputElement = null
            break;
    }
    return (
        <Fragment>
            <label className={styles.formItem}>{props.label}
                {inputElement}
            </label>
        </Fragment>
    )
}

export default input;

input.propTypes = {
    inputType: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    options: PropTypes.array,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    valid: PropTypes.bool,
    value: PropTypes.string,
    inputStyle: PropTypes.string
}

input.defaultProps = {
    inputType: 'input',
    options: [],
    type: 'text'
}