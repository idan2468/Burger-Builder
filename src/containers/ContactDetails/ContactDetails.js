import React, {Component, Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.scss';
import axios from "axios";
import {withRouter} from "react-router";
import Input from "../../components/UI/Input/Input";
import validator from "validator";

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
        isFormValid: false
    }
    generateCustomers = () => {
        let customer = {};
        for (const key in this.state) {
            customer[key] = this.state[key].value;
        }
        return customer;
    }
    submitHandler = async (event) => {
        let customer = this.generateCustomers();
        event.preventDefault();
        try {
            setTimeout(() => this.state.ordered ? this.setState({loading: true}) : null, 500);
            await axios.put('/order', {
                price: this.props.price,
                ingredients: this.props.ingredients,
                customer: customer
            })
            // await new Promise(resolve => setTimeout(() => resolve(), 2000)); delay for showing the spinner
            setTimeout(() => this.setState({loading: false}), 1000)
        } catch (error) {

        }
        this.props.history.replace('/');
        return null
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
                    {/*<Input placeholder={'Enter your name'} name={'fullName'} label={'Full Name'}/>*/}
                    {/*<Input placeholder={'Enter your email'} name={'email'} label={'Email'}/>*/}
                    {/*<Input placeholder={'Enter pay method'} name={'payMethod'} label={'Pay Method'}/>*/}
                    {/*<h4>Address</h4>*/}
                    {/*<Input placeholder={'Enter City'} name={'city'} label={'City'}/>*/}
                    {/*<Input placeholder={'Enter Street'} name={'street'} label={'Street'}/>*/}
                    {/*<Input placeholder={'Enter Postal Code'} name={'postalCode'} label={'Postal Code'} type={'number'}/>*/}
                    <Button type={'ok'} text={'Confirm'} extraStyle={styles.buttonConfirm}
                            disabled={!this.state.isFormValid}/>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(ContactDetails);