import {withRouter} from 'react-router';
import withErrorHandling from "../../hoc/withErrorHandling";
import axios from 'axios';
import {connect} from "react-redux";
import * as actions from "../../store/actions/actions";
import Form from "../../components/UI/Form/Form";
import validator from "validator";
import styles from "../../components/UI/Form/Form.scss";
import Button from "../../components/UI/Button/Button";
import React, {Fragment} from "react";

class Auth extends Form {
    constructor(props) {
        super(props, {
            email: {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter Your Email',
                type: 'email',
                isValid: (value) => validator.isEmail(value)
            },
            username: {
                name: 'username',
                label: 'Username',
                placeholder: 'Enter Your Name',
                type: 'text',
                isValid: (value) => validator.isAlphanumeric(value.replaceAll(' ', '')) && !validator.isEmpty(value)
            },
            password: {
                name: 'password',
                label: 'Password',
                placeholder: 'Enter Your Password',
                type: 'password',
                isValid: (value) => validator.isLength(value, {min: 8})
            },
        });
    }


    submitHandler = async (event) => {
        event.preventDefault();
        const username = this.state.formDetails.username.value;
        const password = this.state.formDetails.password.value;
        await this.props.loginHandler({username: username, password: password})
    }

    render() {
        let generatedForm = this.generateForm();
        let content = (
            <form className={styles.formContainer} onSubmit={this.submitHandler}>
                <h2>Enter your details:</h2>
                {generatedForm}
                <Button type={'ok'} text={'Login'} disabled={!this.state.isFormValid}/>
            </form>
        )
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler: async (payload) => dispatch(actions.loginHandler(payload))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(withErrorHandling(Auth, axios)));