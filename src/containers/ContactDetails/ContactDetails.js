import React, {Component, Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.scss';
import axios from "axios";
import {withRouter} from "react-router";
import Input from "../../components/UI/Input/Input";

class ContactDetails extends Component {
    state = {
        formDetails: {
            fullName: {
                value: '',
                config: {
                    name: 'fullName',
                    label: 'Full Name',
                    placeholder: 'Enter Your Name',
                    type: 'text'
                }
            },
            email: {
                value: '',
                config: {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'Enter Your Email',
                    type: 'email'
                }
            },
            payMethod: {
                value: '',
                config: {
                    name: 'payMethod',
                    label: 'Pay Method',
                    options: ['Credit Card', 'Cash'],
                    type: 'text',
                    inputType: 'select'
                }
            },
            street: {
                value: '',
                config: {
                    name: 'street',
                    label: 'Street',
                    placeholder: 'Enter Your Street',
                    type: 'text'
                }
            },
            postalCode: {
                value: '',
                config: {
                    name: 'postalCode',
                    label: 'Postal Code',
                    placeholder: 'Enter Postal Code',
                    type: 'number'
                }
            },
            city: {
                value: '',
                config: {
                    name: 'city',
                    label: 'City',
                    placeholder: 'Enter Your City',
                    type: 'text'
                }
            }
        }
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

    onChangeHandler(event, key) {
        let updatedFormDetails = {...this.state.formDetails};
        let keyToChange = {...this.state.formDetails[key]};
        keyToChange.value = event.target.value;
        updatedFormDetails[key] = keyToChange;
        this.setState({formDetails: updatedFormDetails});
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
                    <Button type={'ok'} text={'Confirm'} className={styles.buttonConfirm}/>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(ContactDetails);