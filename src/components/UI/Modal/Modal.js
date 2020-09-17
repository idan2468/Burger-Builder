import PropTypes from 'prop-types'
import React, {Component, Fragment} from 'react';
import styles from './Modal.scss';
import Backdrop from "../Backdrop/Backdrop";

class modal extends Component {
    // noinspection JSCheckFunctionSignatures
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.openModal !== this.props.openModal || this.props.children !== nextProps.children;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Modal] - Updated")
    }

    render() {
        let modalStyles = [styles.modalDiv];
        if (this.props.openModal) {
            modalStyles.push(styles.open);
        }
        return (
            <Fragment>
                <Backdrop show={this.props.openModal} onClick={this.props.onClick}/>
                <div className={modalStyles.join(' ')}>
                    {this.props.children}
                </div>
            </Fragment>
        )
    }
}

export default modal;

modal.propTypes = {
    onClick: PropTypes.func,
    openModal: PropTypes.bool
}