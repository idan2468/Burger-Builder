import {withRouter} from 'react-router';
import withErrorHandling from "../../hoc/withErrorHandling";
import axios from 'axios';
import {connect} from "react-redux";
import * as actions from "../../store/actions/actions";
import Form from "../../components/UI/Form/Form";
import validator from "validator";

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
        return super.render();
    }

}

const mapDispatchToProps = (dispatch) => {
    return {
        loginHandler: async (payload) => dispatch(actions.loginHandler(payload))
    }
}

export default connect(null, mapDispatchToProps)(withRouter(withErrorHandling(Auth, axios)));