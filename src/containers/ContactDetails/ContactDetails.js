import React, {Component, Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.scss';
import axios from "axios";
import {withRouter} from "react-router";
import Input from "../../components/UI/Input/Input";
import validator from "validator";
import {connect} from "react-redux";

class ContactDetails extends Component {
    state = {
        formDetails: {
            fullName: {
                value: '',
                config: {
                    name: 'fullName',
                    label: 'Full Name',
                    placeholder: 'Enter Your Name',
                    type: 'text',
                    valid: true
                },
                isValid() {
                    return validator.isAlpha(this.value.replaceAll(' ', '')) && !validator.isEmpty(this.value)
                },
                touched: false
            },
            email: {
                value: '',
                config: {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Enter Your Email',
                    type: 'email',
                    valid: true
                },
                isValid() {
                    return validator.isEmail(this.value)
                },
                touched: false
            },
            payMethod: {
                value: 'Credit Card',
                config: {
                    name: 'payMethod',
                    label: 'Pay Method',
                    options: ['Credit Card', 'Cash'],
                    type: 'text',
                    inputType: 'select',
                    valid: true
                },
                isValid() {
                    return true
                },
                touched: true
            },
            street: {
                value: '',
                config: {
                    name: 'street',
                    label: 'Street',
                    placeholder: 'Enter Your Street',
                    type: 'text',
                    valid: true
                },
                isValid() {
                    return validator.isAlphanumeric(this.value.replaceAll(' ', '')) && !validator.isEmpty(this.value)
                },
                touched: false
            },
            postalCode: {
                value: '',
                config: {
                    name: 'postalCode',
                    label: 'Postal Code',
                    placeholder: 'Enter Postal Code',
                    type: 'number',
                    valid: true
                },
                isValid() {
                    return validator.isNumeric(this.value)
                },
                touched: false
            },
            city: {
                value: '',
                config: {
                    name: 'city',
                    label: 'City',
                    placeholder: 'Enter Your City',
                    type: 'text',
                    valid: true
                },
                isValid() {
                    return !validator.isEmpty(this.value)
                },
                touched: false
            }
        },
        isFormValid: false,
        loading: false
    }
    generateCustomers = () => {
        let customer = {};
        for (const key in this.state.formDetails) {
            customer[key] = this.state.formDetails[key].value;
        }
        return customer;
    }
    submitHandler = async (event) => {
        let customer = this.generateCustomers();
        event.preventDefault();
        console.log(this.props.ingredients)
        let ingredientsCount = Object.keys(this.props.ingredients).reduce((obj, ing) => {
            obj[ing] = this.props.ingredients[ing].count;
            return obj;
        }, {});
        try {
            this.timeOutSpinner = setTimeout(() => this.setState({loading: true}), 500);
            await axios.put('/order', {
                price: this.props.price,
                ingredients: ingredientsCount,
                customer: customer
            })
            // await new Promise(resolve => setTimeout(() => resolve(), 2000)); delay for showing the spinner
        } catch (error) {

        }
        this.props.history.replace('/');
        return null
    }

    componentWillUnmount() {
        clearTimeout(this.timeOutSpinner);
    }

    generateForm = () => {
        let inputs = [];
        for (const key in this.state.formDetails) {
            inputs.push(<Input {...this.state.formDetails[key].config}
                               onChange={(event) => this.onChangeHandler(event, key)}
                               value={this.state.formDetails[key].value} key={key}/>)
        }
        return inputs;
    }
    isFormValid = (updatedFormDetails) => {
        let isValid = true;
        for (const key in updatedFormDetails) {
            isValid = isValid && updatedFormDetails[key].config.valid && updatedFormDetails[key].touched;
        }
        return isValid;
    }

    onChangeHandler(event, key) {
        let updatedFormDetails = {...this.state.formDetails};
        let keyToChange = {...this.state.formDetails[key]};
        keyToChange.value = event.target.value;
        keyToChange.config.valid = keyToChange.isValid();
        keyToChange.touched = true;
        updatedFormDetails[key] = keyToChange;
        let isFormValid = this.isFormValid(updatedFormDetails);
        this.setState({formDetails: updatedFormDetails, isFormValid: isFormValid});
    }

    render() {
        let generatedForm = this.generateForm();
        return (
            <Fragment>
                <form className={styles.formContainer} onSubmit={this.submitHandler}>
                    <h2>Enter your details:</h2>
                    {generatedForm}
                    <Button type={'ok'} text={'Confirm'} extraStyle={styles.buttonConfirm}
                            disabled={!this.state.isFormValid}/>
                </form>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price
    }
}


export default connect(mapStateToProps)(withRouter(ContactDetails));