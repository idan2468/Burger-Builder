import React, {Fragment, useEffect} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.css';
import {withRouter} from "react-router";
import validator from "validator";
import {connect} from "react-redux";
import withErrorHandling from "../../hoc/withErrorHandling";
import * as actions from '../../store/actions/actions'
import axios from "axios";
import LoadingSpinner from "../../components/UI/LoadingSpinner/LoadingSpinner";
import useForm from "../../components/UI/Form/Form";


const contactDetailsConfig = {
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
}


const ContactDetails = (props) => {
    const {state, JSXForm} = useForm(contactDetailsConfig);
    const {ingredients, error, orderCreatedSuccessfully} = props;

    useEffect(() => {
        if ((!error && orderCreatedSuccessfully) || !ingredients) {
            props.history.replace('/');
        }
    }, [ingredients, error, orderCreatedSuccessfully]);

    useEffect(() => {
        if (!ingredients) {
            props.history.replace('/');
        }
    }, []);

    const generateCustomer = () => {
        let customer = {};
        for (const key in state.formDetails) {
            customer[key] = state.formDetails[key].value;
        }
        return customer;
    }
    const submitHandler = async (event) => {
        event.preventDefault();
        let customer = generateCustomer();
        console.log(props.ingredients)
        let ingredientsCount = Object.keys(props.ingredients).reduce((obj, ing) => {
            obj[ing] = props.ingredients[ing].count;
            return obj;
        }, {});
        await props.createOrder({
            customer: customer,
            ingredientsCount: ingredientsCount,
            price: props.price,
            userId: props.userId
        });
        return null
    }

    let content = (
        <form className={styles.formContainer} onSubmit={submitHandler}>
            <h2>Enter your details:</h2>
            {JSXForm}
            <Button type={'ok'} text={'Confirm'} extraStyle={styles.buttonConfirm}
                    disabled={!state.isFormValid}/>
        </form>
    );
    if (props.loading) {
        content = <LoadingSpinner/>
    }
    return (
        <Fragment>
            {content}
        </Fragment>
    )


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