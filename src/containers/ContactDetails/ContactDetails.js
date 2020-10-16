import React, {Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.css';
import {withRouter} from "react-router";
import validator from "validator";
import {connect} from "react-redux";
import withErrorHandling from "../../hoc/withErrorHandling";
import * as actions from '../../store/actions/actions'
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import Form from "../../components/UI/Form/Form";


//todo convert to function component with the help of custom hooks useForm
class ContactDetails extends Form {
    constructor(props) {
        super(props, {
            fullName: {
                name: 'fullName',
                label: 'Full Name',
                placeholder: 'Enter Your Name',
                type: 'text',
                isValid: (value) => validator.isAlpha(value.replaceAll(' ', '')) && !validator.isEmpty(value)
            },
            email: {
                name: 'email',
                label: 'Email',
                placeholder: 'Enter Your Email',
                type: 'email',
                isValid: (value) => validator.isEmail(value)
            },
            payMethod: {
                name: 'payMethod',
                label: 'Pay Method',
                options: ['Credit Card', 'Cash'],
                type: 'text',
                inputType: 'select',
                isValid: (value) => validator.isLength(value, {min: 8})
            },
            street: {
                name: 'street',
                label: 'Street',
                placeholder: 'Enter Your Street',
                type: 'text',
                isValid: (value) => validator.isAlphanumeric(value.replaceAll(' ', '')) && !validator.isEmpty(value)
            },
            postalCode: {
                name: 'postalCode',
                label: 'Postal Code',
                placeholder: 'Enter Postal Code',
                type: 'number',
                isValid: (value) => validator.isNumeric(value)
            },
            city: {
                name: 'city',
                label: 'City',
                placeholder: 'Enter Your City',
                type: 'text',
                isValid: (value) => !validator.isEmpty(value)
            },
        });
    }

    generateCustomer = () => {
        let customer = {};
        for (const key in this.state.formDetails) {
            customer[key] = this.state.formDetails[key].value;
        }
        return customer;
    }
    submitHandler = async (event) => {
        event.preventDefault();
        let customer = this.generateCustomer();
        console.log(this.props.ingredients)
        let ingredientsCount = Object.keys(this.props.ingredients).reduce((obj, ing) => {
            obj[ing] = this.props.ingredients[ing].count;
            return obj;
        }, {});
        await this.props.createOrder({
            customer: customer,
            ingredientsCount: ingredientsCount,
            price: this.props.price,
            userId: this.props.userId
        });
        return null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((!this.props.error && this.props.orderCreatedSuccessfully) || !this.props.ingredients) {
            this.props.history.replace('/');
        }
    }

    componentDidMount() {
        if (!this.props.ingredients) {
            this.props.history.replace('/');
        }
    }

    render() {
        let generatedForm = this.generateForm();
        let content = (
            <form className={styles.formContainer} onSubmit={this.submitHandler}>
                <h2>Enter your details:</h2>
                {generatedForm}
                <Button type={'ok'} text={'Confirm'} extraStyle={styles.buttonConfirm}
                        disabled={!this.state.isFormValid}/>
            </form>
        );
        if (this.props.loading) {
            content = <LoadingSpinner/>
        }
        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price,
        loading: state.order.loading,
        orderCreatedSuccessfully: state.order.orderCreatedSuccessfully,
        userId: state.auth.userId,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createOrder: async (payload) => dispatch(actions.createOrder(payload))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withErrorHandling(ContactDetails, axios)));