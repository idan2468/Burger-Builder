import {withRouter} from 'react-router';
import withErrorHandling from "../../hoc/withErrorHandling";
import axios from 'axios';
import {connect} from "react-redux";
import * as actions from "../../store/actions/actions";
import validator from "validator";
import styles from "./Auth.css";
import Button from "../../components/UI/Button/Button";
import React, {Fragment, useEffect, useState} from "react";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useForm from "../../components/UI/Form/Form";

const authConfig = {
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
}

const Auth = (props) => {
    const {state, disableField, enableField, JSXForm, cleanForm} = useForm(authConfig);
    const [isLogin, setIsLogin] = useState(false);
    const {ordered, isAuth} = props;

    useEffect(() => {
        changeAuthMode();
        props.resetState();
    }, [])

    useEffect(() => {
        if (ordered && isAuth) {
            props.history.replace('/checkout');
        } else if (isAuth) {
            props.history.replace('/');
        }
    }, [ordered, isAuth]);


    const submitHandler = async (event) => {
        event.preventDefault();
        const username = state.formDetails.username.value;
        const password = state.formDetails.password.value;
        const email = state.formDetails.email.value;
        if (isLogin) {
            await props.loginHandler({username: username, password: password});
        } else {
            await props.registerHandler({username: username, password: password, email: email});
            changeAuthMode();
        }
    }

    const changeAuthMode = () => {
        // Changing to login mode
        if (!isLogin) {
            disableField('email');
        }
        // Changing to signup mode
        else {
            enableField('email');
        }
        cleanForm();
        setIsLogin(isLogin => !isLogin);
    }

    let content = (
        <Fragment>
            <form className={styles.formContainer} onSubmit={submitHandler}>
                <h2>Enter your details:</h2>
                {JSXForm}
                <Button type={'ok'} text={isLogin ? 'Login' : 'Signup'}
                        disabled={!state.isFormValid}/>
                <Button type={'ok'} text={`Switch to ${!isLogin ? 'Login' : 'Signup'}`}
                        onClick={changeAuthMode} extraStyle={styles.switchModeBtn} buttonType={'button'}/>
            </form>
        </Fragment>
    )

    if (props.loading) {
        content = <LoadingSpinner/>
    }
    console.log(props.error)
    if (props.error) {
        content = (
            <form className={styles.formContainer} onSubmit={submitHandler} style={{width: '100%'}}>
                <h1>{props.error}</h1>
            </form>
        )
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    );
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
        registerHandler: async (payload) => dispatch(actions.registerHandler(payload)),
        resetState: async () => dispatch(actions.resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandling(Auth, axios)));