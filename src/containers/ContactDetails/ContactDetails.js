import React, {Component, Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.scss';
import axios from "axios";
import {withRouter} from "react-router";
import Input from "../../components/UI/Input/Input";

class ContactDetails extends Component {
    state = {
        fullName: 'Idan Shafrir',
        email: 'idans2468@gmail.com',
        address: {
            street: 'Nahal Sorek 16',
            postalCode: '40300',
            city: 'Kfar Yona'
        },
        payMethod: 'credit card'
    }
    submitHandler = async (event) => {
        event.preventDefault();
        try {
            setTimeout(() => this.state.ordered ? this.setState({loading: true}) : null, 500);
            await axios.put('/order', {
                price: this.props.price,
                ingredients: this.props.ingredients,
                customer: this.state
            })
            // await new Promise(resolve => setTimeout(() => resolve(), 2000)); delay for showing the spinner
            setTimeout(() => this.setState({loading: false}), 1000)
        } catch (error) {

        }
        this.props.history.replace('/');
        return null
    }

    render() {
        return (
            <Fragment>
                <form className={styles.formContainer}>
                    <h2>Enter your credentials:</h2>
                    <Input placeholder={'Enter your name'} name={'fullName'} label={'Full Name'}/>
                    <Input placeholder={'Enter your email'} name={'email'} label={'Email'}/>
                    <Input placeholder={'Enter pay method'} name={'payMethod'} label={'Pay Method'}/>
                    <h4>Address</h4>
                    <Input placeholder={'Enter City'} name={'city'} label={'City'}/>
                    <Input placeholder={'Enter Street'} name={'street'} label={'Street'}/>
                    <Input placeholder={'Enter Postal Code'} name={'postalCode'} label={'Postal Code'} type={'number'}/>
                    <Button type={'ok'} text={'Confirm'} onClick={this.submitHandler} className={styles.buttonConfirm}/>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(ContactDetails);