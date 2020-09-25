import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './Button.scss'

const mapTypeToStyle = {
    'ok': styles.okBtn,
    'cancel': styles.cancelBtn
}

const button = (props) => {
    let buttonStyles = [styles.btn];
    buttonStyles.push(mapTypeToStyle[props.type]);
    if (props.className) {
        buttonStyles.push(props.className);
    }
    return (
        <Fragment>
            <button className={buttonStyles.join(' ')} onClick={props.onClick}
                    disabled={props.disabled}>{props.text}</button>
        </Fragment>
    )
}

export default button;

button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
  type: PropTypes.string
}

button.defaultProps = {
  text: 'ok',
  type: 'ok'
}