import React, {Component, Fragment} from 'react';
import Button from "../../components/UI/Button/Button";
import styles from './ContactDetails.scss';
import axios from "axios";
import {withRouter} from "react-router";

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
                ingredients: this.props.ingredients
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
                    <label className={styles.formItem}>Full Name
                        <input type="text" name="fullName" placeholder={'Enter your name'}/>
                    </label>
                    <label className={styles.formItem}>Email
                        <input type="text" name="email" placeholder={'Enter your email'}/>
                    </label>
                    <label className={styles.formItem}>Pay Method
                        <input type="text" name="payMethod" placeholder={'Enter pay method'}/>
                    </label>
                    <h4>Address</h4>
                    <label className={styles.formItem}>City
                        <input type="text" name="city" placeholder={'Enter City'}/>
                    </label>
                    <label className={styles.formItem}>Street
                        <input type="text" name="street" placeholder={'Enter Streed'}/>
                    </label>
                    <label className={styles.formItem}>Postal Code
                        <input type="text" name="postalCode" placeholder={'Enter Postal Code'}/>
                    </label>
                    <Button type={'ok'} text={'Confirm'} onClick={this.submitHandler} className={styles.buttonConfirm}/>
                </form>
            </Fragment>
        )
    }
}

export default withRouter(ContactDetails);