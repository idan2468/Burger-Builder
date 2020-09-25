import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Input.scss';

const input = (props) => {
    let inputStyle = !props.valid ? styles.invalid : null;
    let inputElement = null;
    let optionsElements = props.options.map(option => <option key={option} value={option}>{option}</option>);
    switch (props.inputType) {
        case 'input':
            inputElement =
                <input type={props.type} name={props.name} placeholder={props.placeholder} value={props.value}
                       onChange={props.onChange} className={inputStyle}/>;
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
  inputType: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  valid: PropTypes.bool,
  value: PropTypes.string
}

input.defaultProps = {
  inputType: 'input',
  options: [],
  type: 'text'
}