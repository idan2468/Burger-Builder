import PropTypes from 'prop-types'
import React, {Fragment} from 'react';
import styles from './BuildController.scss';
import BuildControl from './BuildControl/BuildControl'
import Button from "../../UI/Button/Button";

const mapTypeToLabel = {
    'meat': 'Meat',
    'salad': 'Green Salad',
    'cheese': 'Cheddar',
    'bacon': 'Delicious Bacon'
}

const buildController = (props) => {
    let controls = Object.keys(props.ingredients).map((ingredient) => {
        return (
            <BuildControl {...{
                name: ingredient,
                count: props.ingredients[ingredient],
                key: ingredient,
                onClick: props.onClick,
                label: mapTypeToLabel[ingredient]
            }}/>
        )
    });

    return (
        <Fragment>
            <div className={styles.outerDiv}>
                {controls}
                <Button className={styles.btnOrder} disabled={props.price === 0} onClick={props.onOrder}
                        text={'Order'}/>
            </div>
        </Fragment>
    )
}

export default buildController;

buildController.propTypes = {
    ingredients: PropTypes.object,
    onClick: PropTypes.func,
    onOrder: PropTypes.func,
    price: PropTypes.number
}