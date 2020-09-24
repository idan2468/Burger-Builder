import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Input.scss';

const input = (props) => {
    return (
        <Fragment>
            <label className={styles.formItem}>{props.label}
                <input type={props.type} name={props.name} placeholder={props.placeholder}/>
            </label>
        </Fragment>
    )
}

export default input;

input.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string
}

input.defaultProps = {
    type: 'text'
}