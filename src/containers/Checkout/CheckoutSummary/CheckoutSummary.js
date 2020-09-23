import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './CheckoutSummary.scss'
import Button from "../../../components/UI/Button/Button";

const checkoutSummary = (props) => {
    let ingredients = null;
    if (props.ingredients) {
        ingredients = Object.keys(props.ingredients).map(key => {
            return props.ingredients[key] === 0 ? null : (
                <Fragment key={key}>
                    <h3 className={styles.ingredientsCol1}>{key}</h3>
                    <h3 className={styles.ingredientsCol2}>{props.ingredients[key]}</h3>
                </Fragment>
            )
        })
    }
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.ingredientsGrid}>
                    {ingredients}
                </div>
                <h2 className={styles.price}>Price: ${props.price ? props.price : 20}</h2>
                <div style={{display: 'flex', alignContent: 'center'}}>
                    <Button type={'ok'} text={'Checkout'} onClick={props.onOk}/>
                    <Button type={'cancel'} text={'Cancel'} onClick={props.onCancel}/>
                </div>
            </div>
        </Fragment>
    )
}

export default checkoutSummary;

checkoutSummary.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired
}