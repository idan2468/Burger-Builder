import {withRouter} from 'react-router';
import withErrorHandling from "../../hoc/withErrorHandling";
import axios from 'axios';
import {connect} from "react-redux";
import * as actions from "../../store/actions/actions";
import Form from "../../components/UI/Form/Form";
import validator from "validator";
import styles from "./Auth.scss";
import Button from "../../components/UI/Button/Button";
import React, {Fragment} from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";

class Auth extends Form {
    constructor(props) {
        super(props, {
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
            email: {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter Your Email',
                type: 'email',
                isValid: (value) => validator.isEmail(value)
            },
        });
        this.state.isLogin = false;
    }


    submitHandler = async (event) => {
        event.preventDefault();
        const username = this.state.formDetails.username.value;
        const password = this.state.formDetails.password.value;
        const email = this.state.formDetails.email.value;
        if (this.state.isLogin) {
            await this.props.loginHandler({username: username, password: password});
        } else {
            await this.props.registerHandler({username: username, password: password, email: email});
            this.changeAuthMode();
        }

    }

    componentDidMount() {
        this.changeAuthMode();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.logon && !this.props.error) {
        //     this.props.history.replace('/');
        // }
        if (this.props.ordered && this.props.isAuth) {
            this.props.history.replace('/checkout');
        } else if (this.props.isAuth) {
            this.props.history.replace('/');
        }
    }

    changeAuthMode = () => {
        // Changing to login mode
        if (!this.state.isLogin) {
            super.disableField('email');
        }
        // Changing to signup mode
        else {
            super.enableField('email');
        }
        super.cleanForm();
        this.setState({isLogin: !this.state.isLogin});
    }

    render() {
        let generatedForm = this.generateForm();
        let content = (
            <Fragment>
                <form className={styles.formContainer} onSubmit={this.submitHandler}>
                    <h2>Enter your details:</h2>
                    {generatedForm}
                    <Button type={'ok'} text={this.state.isLogin ? 'Login' : 'Signup'}
                            disabled={!this.state.isFormValid}/>
                    <Button type={'ok'} text={`Switch to ${!this.state.isLogin ? 'Login' : 'Signup'}`}
                            onClick={this.changeAuthMode} extraStyle={styles.switchModeBtn} buttonType={'button'}/>
                </form>
            </Fragment>
        )
        if (this.props.loading) {
            content = <LoadingSpinner/>
        }
        if (this.props.error) {
            content = (
                <form className={styles.formContainer} onSubmit={this.submitHandler} style={{width: '100%'}}>
                    <h1>{this.props.error}</h1>
                </form>
            )
        }
        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }


}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        token: state.auth.token,
        ordered: state.burger.ordered,
        isAuth: state.auth.logon,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler: async (payload) => dispatch(actions.loginHandler(payload)),
        registerHandler: async (payload) => dispatch(actions.registerHandler(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandling(Auth, axios)));