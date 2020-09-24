import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Input.scss';

const input = (props) => {
    let inputElement = null;
    let optionsElements = props.options.map(option => <option key={option} value={option}>{option}</option>);
    switch (props.inputType) {
        case 'input':
            inputElement =
                <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value}
                       onChange={props.onChange}/>;
            break
        case 'select':
            inputElement = (
                <select name={props.name} placeholder={props.placeholder} value={props.value}
                        onChange={props.onChange}>
                    {optionsElements}
                </select>
            );
    }
    return (
        <Fragment>
            <label className={styles.formItem}>{props.label}
                {/*<input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value}*/}
                {/*       onChange={props.onChange}/>*/}
                {/*<input {...props}/>*/}
                {inputElement}
            </label>
        </Fragment>
    )
}

export default input;

input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    inputType: PropTypes.string,
    options: PropTypes.array
}

input.defaultProps = {
    type: 'text',
    inputType: 'input',
    options: []
}